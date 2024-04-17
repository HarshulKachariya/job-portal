import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostAJob from "./components/PostAJob.jsx";
import PostedJob from "./components/PostedJob.jsx";
import Dashboard from "./components/Dashboard.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import ViewJob from "./components/ViewJob.jsx";
import SignIn from "./components/SignIn.jsx";
import DisplayDetails from "./components/DisplayDetails.jsx";
import SignUp from "./components/SignUp.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignOut from "./components/SignOut.jsx";
import AppliedJob from "./components/AppliedJob.jsx";
import Home from "./components/Home.jsx";

import { store } from "./store/store.js";
import { Provider } from "react-redux";

const router = (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="postAJob" element={<PostAJob />} />
        <Route path="postedJob" element={<PostedJob />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="contact" element={<Contact />} />
        <Route path="appliedJob/:id" element={<AppliedJob />} />
        <Route path="details/:id" element={<DisplayDetails />} />
        <Route path="viewJob" element={<ViewJob />} />
        <Route path="register" element={<SignUp />} />
        <Route path="login" element={<SignIn />} />
        <Route path="about" element={<About />} />
        <Route path="logout" element={<SignOut />} />
      </Route>
    </Routes>
  </Router>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>{router}</Provider>
    <ToastContainer />
  </>
);
