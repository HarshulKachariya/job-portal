import React, { useEffect, useState } from "react";
import App from "./../App";
import { Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const auth = localStorage.getItem("token");

  return <>{!!auth ? <App /> : <Navigate to="/login" />}</>;
};

export default PrivateRoute;
