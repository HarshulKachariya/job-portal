import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { auth } from "../firebase";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false); // Update loading state when user data is fetched
    });
  };

  useEffect(() => {
    getUser();
  }, []); // Run only once when component mounts

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching user data
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
