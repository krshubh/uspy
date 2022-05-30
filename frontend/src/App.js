import * as React from "react";
import "./App.css";
import PrivateRoute from "./utils/PrivateRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { AuthProvider } from "./context/AuthContext";
import ProfilePage from "./pages/ProfilePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <AuthProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute component={HomePage} redirect="/login" />
                }
              />
              <Route element={<LoginPage />} path="/login" />
              <Route element={<SignupPage />} path="/signup" />
              <Route element={<ProfilePage />} path="/profile" />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    );
  }
}

export default App;
