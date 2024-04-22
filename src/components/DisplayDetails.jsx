import React, { useState, useEffect } from "react";
import ImageCard from "./ImageCard";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { MdCategory } from "react-icons/md";
import { HiCurrencyRupee } from "react-icons/hi";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { FiUserPlus } from "react-icons/fi";
import { NavLink, useParams } from "react-router-dom";
import { db, auth } from "../firebase";
import { doc, getDoc, serverTimestamp } from "firebase/firestore";

import { addPost, removePost } from "../store/AppliedJobSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { useAuth } from "../context/AuthContext";

import Loader from "./Loader";

const DisplayDetails = () => {
  const [bookMark, setBookMark] = useState(false);
  const [job, setJob] = useState([]);
  const [isLoadding, setIsLoadding] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();

  const { jobDetails } = useAuth();

  const userId = auth.currentUser;

  // Function to set a cookie with an array value
  const setCookieArray = (cname, cvalue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = "expires=" + d.toUTCString();
    const cookieValues = JSON.stringify(cvalue); // Convert array to JSON string
    document.cookie = cname + "=" + cookieValues + ";" + expires + ";path=/";
  };

  // Function to get an array from a cookie
  const getCookieArray = (cname) => {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        const cookieValues = c.substring(name.length, c.length);
        return JSON.parse(cookieValues); // Parse JSON string to array
      }
    }
    return [];
  };

  // Check if the user has already saved the job
  useEffect(() => {
    const savedPosts = getCookieArray("savedPosts");
    if (savedPosts.includes(id)) {
      setBookMark(true);
    }
  }, [id]);

  useEffect(() => {
    const fetchJobDetails = async () => {
      const temp = [];
      try {
        const setJobs = jobDetails.filter((jobId) => jobId.id == id);
        setJobs.map((job) => {
          temp.push({ ...job.data, id: job.id });
        });
        setJob(temp);
        setIsLoadding(false);
      } catch (error) {
        setJob(null);
        console.error("Error fetching job details:", error);
      }
    };
    setTimeout(() => {
      fetchJobDetails();
    }, 300);
  }, [id]);

  const handleClickUnset = (postId) => {
    dispatch(removePost(postId));
    // Remove postId from savedPosts array in cookie
    const savedPosts = getCookieArray("savedPosts");
    const updatedSavedPosts = savedPosts.filter((postId) => postId !== id);
    setCookieArray("savedPosts", updatedSavedPosts, 365);
    setBookMark(false);
    toast.success("post unsaved successfully");
  };

  // get the job details for pass to the save post
  const jobDetail = [];
  job.map((job) => {
    jobDetail.push({
      jobDeadline: job.jobDeadline,
      title: job.title,
      company: job.company,
      salary: job.salary,
      save_id: job.id,
    });
  });
  // console.log(...jobDetail);

  const handleClickSet = () => {
    try {
      // Add postId to savedPosts array in cookie
      const savedPosts = getCookieArray("savedPosts");
      const updatedSavedPosts = [...savedPosts, id];
      setCookieArray("savedPosts", updatedSavedPosts, 365);
      const { jobDeadline, title, company, salary } = jobDetail[0];
      dispatch(
        addPost({
          save_id: id,
          userId: userId.uid,
          jobDeadline,
          title,
          company,
          salary,
          save_post_at: serverTimestamp(),
        })
      );
      setBookMark(true);
      toast.success("post saved successfully");
    } catch (error) {
      console.log(error);
    }
    console.log(id, "applied job id");
  };

  return (
    <>
      {isLoadding ? (
        <Loader />
      ) : (
        <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-20 w-full">
          {job.map((job) => (
            <>
              <div
                className="flex justify-center items-center mb-6"
                key={job.id}
              >
                <h1 className="text-3xl sm:text-4xl lg:text-5xl text-emerald-600 font-bold">
                  Job Details
                </h1>
              </div>
              <ImageCard />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center">
                    <FaUserAlt className="text-emerald-600 text-sm mr-2" />
                    <div>
                      <h1 className="font-semibold text-base">
                        Jobposter{" "}
                        <span className="font-normal text-base">
                          {job.company}
                        </span>
                      </h1>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MdEmail className="text-emerald-600 text-sm mr-2" />
                    <div>
                      <h1 className="font-semibold text-base">
                        Email{" "}
                        <span className="font-normal text-base">
                          {job.email}
                        </span>
                      </h1>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <SlLocationPin className="text-emerald-600 text-sm mr-2" />
                    <div>
                      <h1 className="font-semibold text-base">
                        Location{" "}
                        <span className="font-normal text-base">
                          {job.jobLocation}
                        </span>
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center">
                    <MdCategory className="text-emerald-600 text-sm mr-2" />
                    <div>
                      <h1 className="font-semibold text-base">
                        Category{" "}
                        <span className="font-normal text-base ">
                          {job.jobCategory}
                        </span>
                      </h1>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <HiCurrencyRupee className="text-emerald-600 text-sm mr-2" />
                    <div>
                      <h1 className="font-semibold text-base">
                        Job Type{" "}
                        <span className="font-normal text-base">
                          {job.jobType}
                        </span>
                      </h1>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <HiCurrencyRupee className="text-emerald-600 text-sm mr-2" />
                    <div>
                      <h1 className="font-semibold text-base">
                        Salary{" "}
                        <span className="font-normal text-base">
                          {job.salary} $ / month
                        </span>
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center mt-6">
                {!bookMark ? (
                  <FaRegBookmark
                    onClick={handleClickSet}
                    className="text-emerald-600 text-4xl"
                  />
                ) : (
                  <FaBookmark
                    onClick={() => handleClickUnset(job.id)}
                    className="text-emerald-600 text-4xl"
                  />
                )}
                <div className="rounded-md bg-emerald-600 p-4 text-xl uppercase text-white hover:text-gray-800 cursor-pointer">
                  <NavLink to={`/appliedJob/${id}`}>Apply position</NavLink>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 gap-6 md:gap-8">
                <div className="p-4 bg-gray-100 rounded-lg hover:shadow-lg hover:transition-all hover:duration-300 hover:ease-linear">
                  <h1 className="font-bold text-xl text-emerald-600 mb-4">
                    Job Description
                  </h1>
                  <p>{job.description}</p>
                </div>
                <div className="p-4 bg-gray-100  rounded-lg hover:shadow-lg hover:transition-all hover:duration-300 hover:ease-linear">
                  <h1 className="font-bold text-xl text-emerald-600 mb-4">
                    Job Summary
                  </h1>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center">
                      <FiUserPlus className="text-emerald-600 text-sm mr-2" />
                      <div>
                        <h1 className="font-semibold text-base">
                          Total vacancies{" "}
                          <span className="font-normal text-base">
                            {job.jobVacancy}
                          </span>
                        </h1>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaUserAlt className="text-emerald-600 text-sm mr-2" />
                      <div>
                        <h1 className="font-semibold text-base">
                          Deadline{" "}
                          <span className="font-normal text-base">
                            {job.jobDeadline}
                          </span>
                        </h1>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FiUserPlus className="text-emerald-600 text-sm mr-2" />
                      <div>
                        <h1 className="font-semibold text-base">
                          Experience Required{" "}
                          <span className="font-normal text-base">
                            {job.jobExperience}
                          </span>
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default DisplayDetails;
