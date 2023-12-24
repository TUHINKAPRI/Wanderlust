import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
function PrivateRoute() {
  let { currentUser } = useSelector((state) => state.user.user);
  return <div>{currentUser ? <Outlet /> : <Navigate to="/log-in" />}</div>;
}

export default PrivateRoute;
