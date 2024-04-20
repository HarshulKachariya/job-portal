import React from "react";
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <img
        src="https://img.freepik.com/free-vector/400-error-bad-request-concept-illustration_114360-1933.jpg?w=740&t=st=1712168787~exp=1712169387~hmac=6c70179e9db14fae737a2076c84ebe8e30b819ca6bb31e7636e0351282ed4016"
        alt="404"
        className="w-80 h-80 mb-8 mix-blend-multiply"
      />
      <button className="bg-emerald-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2">
        <NavLink to={"/"}> Go Back to Home</NavLink>
      </button>
    </div>
  );
};

export default ErrorPage;
