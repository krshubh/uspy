import * as React from "react";
import "./App.css";
import { Component, useContext, useState, useEffect } from "react";
import PrivateRoute from "./utils/PrivateRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import SignupPage from "./pages/SignupPage";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ProfilePage from "./pages/ProfilePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactUsPage from "./pages/ContactUsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import PageNotFound from "./pages/PageNotFound";

const themeLight = createTheme({
  palette: {
    background: {
      default: "#e4f0e2",
    },
  },
});

const themeDark = createTheme({
  palette: {
    background: {
      default: "#222222",
    },
    text: {
      primary: "#ffffff",
    },
  },
});

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <AuthProvider>
            <Routes>
              <Route element={<MainPage />} path="/" />
              <Route element={<LoginPage />} path="/login" />
              <Route element={<SignupPage />} path="/signup" />
              <Route element={<ContactUsPage />} path="/contact-us" />
              <Route element={<PrivacyPolicyPage />} path="/privacy-policy" />
              <Route
                element={<PrivateRoute component={HomePage} redirect="/" />}
                path="/dashboard"
              />
              <Route
                element={<PrivateRoute component={ProfilePage} redirect="/" />}
                path="/profile"
              />
              <Route element={<PageNotFound />} path="*" />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    );
  }
}

export default App;
// export default function (props) {
//   const [light, setLight] = React.useState(true);
//   return (
//     <ThemeProvider theme={light ? themeLight : themeDark}>
//       <CssBaseline /> <App />{" "}
//     </ThemeProvider>
//   );
// }
