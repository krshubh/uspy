import * as React from "react";
import "./App.css";
import { HOTJAR_HJID, HOTJAR_HJSV } from "./constants";
import { Component, useContext, useState, useEffect } from "react";
import PrivateRoute from "./utils/PrivateRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import SignupPage from "./pages/SignupPage";
import { AuthProvider } from "./context/AuthContext";
import AuthContext from "./context/AuthContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ProfilePage from "./pages/ProfilePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactUsPage from "./pages/ContactUsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import PageNotFound from "./pages/PageNotFound";
import PasswordResetPage from "./pages/PasswordResetPage";
import PasswordResetConfirmPage from "./pages/PasswordResetConfirmPage";
import { hotjar } from "react-hotjar";

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
              {/* Password Reset */}
              <Route path="/password-reset" element={<PasswordResetPage />} />
              <Route
                path="/password-reset/confirm/:token"
                element={<PasswordResetConfirmPage />}
              />
              <Route element={<PageNotFound />} path="*" />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    );
  }
}

export default function (props) {
  const navigation = useNavigate();

  useEffect(() => {
    hotjar.initialize(HOTJAR_HJID, HOTJAR_HJSV);
  }, []);

  return <App {...props} navigation={navigation} />;
}
