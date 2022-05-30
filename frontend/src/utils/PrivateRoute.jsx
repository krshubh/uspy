import { Route, Routes, Redirect, Outlet, Navigate } from "react-router-dom";
import { React, useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  let { user } = useContext(AuthContext);
  return user ? <Component /> : <Navigate to={rest.redirect} />;
};

export default PrivateRoute;
