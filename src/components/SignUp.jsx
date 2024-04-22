import React, { useState } from "react";
import InputBox from "./InputBox";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  // SignUp using Context API
  const { SignUp } = useAuth();
  const signupWithUsernameAndPassword = async (e) => {
    e.preventDefault();
    try {
      await SignUp(email, password);
      toast.success("registration successfull");
      navigate("/login");
    } catch {
      toast.error("Sorry, something went wrong. Please try again.");
    }
  };

  return (
    <div className="px-10 sm:px-10 py-20 md:px-10 ">
      <div
        className={`max-w-lg mx-auto flex flex-col justify-center items-center gap-x-8 my-4 border-2 border-emerald-600 shadow-xl h-full p-5 rounded-md `}
      >
        <h1 className="md:text-3xl text-2xl border-b-2  border-b-emerald-600 text-center uppercase m-3">
          Sign Up
        </h1>
        <form className="w-full h-full flex flex-col gap-2 justify-center items-center md:justify-center md:items-center md:w-96">
          <div className="w-full">
            <label>Username:</label>
            <InputBox
              type="username"
              name=""
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder={"username"}
              id="usename"
            />
          </div>

          <div className="w-full">
            <label>Email:</label>
            <InputBox
              type="email"
              name=""
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder={"jobboard@job.com"}
              id="email"
            />
          </div>

          <div className="w-full">
            <label>Phone:</label>
            <InputBox
              type="text"
              name=""
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              placeholder={"9876543210"}
              id="phone"
            />
          </div>

          <div className="w-full">
            <label>Password:</label>
            <InputBox
              type="password"
              name=""
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
            onClick={(e) => {
              signupWithUsernameAndPassword(e);
            }}
          >
            Submit
          </button>
          <h3>
            already have an account?{" "}
            <NavLink to="/login" className="hover:underline">
              Sign In
            </NavLink>
          </h3>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
