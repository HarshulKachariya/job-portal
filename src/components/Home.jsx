import React, { useState, useEffect } from "react";

import { NavLink } from "react-router-dom";
import FeatureSection from "./Feature";
import ReviewSection from "./ReviewSection";

import { auth } from "../firebase";

function Home() {
  const [isLogedin, setIsLogedIn] = useState(false);
  const user = auth.currentUser;

  const handleLogout = () => {
    auth.signOut();
  };

  useEffect(() => {
    if (user) {
      setIsLogedIn(true);
    } else {
      setIsLogedIn(false);
    }
    return () => {};
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
        {/* Left Section - Image */}
        <div className="w-full md:w-1/2">
          <img
            src="https://t4.ftcdn.net/jpg/05/05/61/73/240_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg"
            alt="Job Portal"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Section - Content */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            <>
              Welcome{" "}
              <span className="text-emerald-600 font-bold">
                {isLogedin ? user.email : ""}
              </span>{" "}
              to Job Portal
            </>
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Opportunity to get a Job in your Dream Company
          </p>

          {/* Conditional Rendering based on authentication */}

          {!isLogedin ? (
            <NavLink to={`/login`}>
              <button className="py-3 px-6 bg-emerald-500 text-white rounded-md shadow-md hover:bg-emerald-600 transition duration-300">
                Sign In
              </button>
            </NavLink>
          ) : (
            <NavLink to={`/viewjob`}>
              <button className="py-3 px-6 bg-emerald-500 text-white rounded-md shadow-md hover:bg-emerald-600 transition duration-300">
                Apply now
              </button>
            </NavLink>
          )}
        </div>
      </div>
      <FeatureSection />
      <ReviewSection />
    </>
  );
}

export default Home;
