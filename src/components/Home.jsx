import React, { useState, useEffect } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import FeatureSection from "./Feature";
import ReviewSection from "./ReviewSection";

import hero from "../assets/hero.jpg";

import { auth } from "../firebase";

function Home() {
  const [isLogedin, setIsLogedIn] = useState(false);
  const user = auth.currentUser;
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogedIn(true);
    } else {
      setIsLogedIn(false);
    }
    return () => {};
  }, [localStorage.getItem("token")]);

  return (
    <>
      <div className="flex flex-col md:flex-row bg-gray-100 max-h-screen">
        {/* Left Section - Image */}
        <div className="w-full pt-10 flex-1 max-auto md:w-1/2">
          <img
            src={hero}
            alt="Job Portal"
            className="object-cover w-full p-10 h-full"
          />
        </div>

        {/* Right Section - Content */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center">
          <h1 className="text-3xl md:text-4xl  font-bold text-gray-800 mb-4">
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
