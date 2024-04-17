import React, { useState } from "react";
import InputBox from "./InputBox";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

import { toast } from "react-toastify";

const SignIn = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginWithUsernameAndPassword = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log(uid);
        } else {
          console.log("user not signed in");
        }
      });
      toast.success("Logged in successfully!");
      navigate("/postedJob"); // Navigate to the "/postedJob" route after successful login
    } catch (error) {
      toast.error("You entered a wrong username or password.", error.message); // Log the error message
    }
  };

  return (
    <div className="px-10 sm:px-10 py-20 md:px-10 ">
      <div
        className={`max-w-lg mx-auto flex flex-col justify-center items-center gap-x-8 my-4 border-2 border-emerald-600 shadow-xl h-full p-5 rounded-md`}
      >
        <h1 className="md:text-3xl text-2xl border-b-2  border-b-emerald-600 text-center uppercase m-3">
          Sign In
        </h1>
        <form
          action=""
          className="w-full h-full flex flex-col gap-2 justify-center items-center md:justify-center md:items-center md:w-96"
        >
          <div className="w-full">
            <label>Email:</label>
            <InputBox
              type="email"
              name=""
              onFocus={"email"}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder={"Enter a email contacted for this job"}
              id="email"
            />
          </div>
          <div className="w-full">
            <label>Password:</label>
            <InputBox
              type="password"
              name=""
              onFocus={"password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder={"Enter password"}
              id="password"
            />
          </div>

          <button
            className="w-full p-3 border-[1px] text-white rounded-md bg-emerald-600 "
            onClick={(e) => loginWithUsernameAndPassword(e)}
          >
            Submit
          </button>
          <h3>
            don't have an account?{" "}
            <NavLink to="/register" className="hover:underline">
              Sign Up
            </NavLink>
          </h3>
          <h3>
            <a href="" className="hover:underline">
              forgot password
            </a>
          </h3>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
