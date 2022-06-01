import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { TOKEN_API, REFRESH_TOKEN_API, SIGN_UP_API } from "../constants";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );

  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  let signUpUser = async (e) => {
    e.preventDefault();
    let response = await fetch(SIGN_UP_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
        first_name: e.target.firstname.value,
        last_name: e.target.lastname.value,
      }),
    });
    let data = await response.json();
    console.log(data);
    if (response.status === 200) {
      loginUser(e);
    } else {
      alert("Something went wrong");
    }
  };

  let loginUser = async (e) => {
    e.preventDefault();
    let response = await fetch(TOKEN_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
    } else {
      alert("Something went wrong");
    }
  };

  let logoutUser = () => {
    console.log("logout called");
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  let updateToken = async () => {
    let response = await fetch(REFRESH_TOKEN_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: authTokens.refresh,
      }),
    });
    let data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      // navigate("/");
    } else {
      loginUser();
    }
  };

  let contexData = {
    user: user,
    loginUser: loginUser,
    logoutUser: logoutUser,
    signUpUser: signUpUser,
  };

  useEffect(() => {
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contexData}>{children}</AuthContext.Provider>
  );
};
