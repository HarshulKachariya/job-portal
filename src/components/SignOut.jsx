import React from "react";

import { useNavigate } from "react-router-dom";

import { auth } from "../firebase";
import { toast } from "react-toastify";

const SignOut = () => {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem("token");
      navigate("/login");
      toast.success("Successfully logedout...");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button type="button" onClick={handleSignOut} className="mt-20">
        SignOut
      </button>
    </div>
  );
};
export default SignOut;
