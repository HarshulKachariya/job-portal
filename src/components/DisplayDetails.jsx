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
import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

import { addPost, removePost } from "../store/AppliedJobSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import Loader from "./Loader";

const DisplayDetails = () => {
  const [bookMark, setBookMark] = useState(false);
  const [jobDetails, setJobDetails] = useState(null);
  const [saveJobPost, setSaveJobPost] = useState([]);
  const [saved, setSaved] = useState([]);

  const [isLoadding, setIsLoadding] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();

  const userId = auth.currentUser;
  // const userId = user ? user.uid : null;

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const docRef = doc(db, "job-listing", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setJobDetails(docSnap.data());
          setIsLoadding(false);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    setTimeout(() => {
      fetchJobDetails();
    }, 1000);
  }, [id]);

  useEffect(() => {
    const fetchSavePost = async () => {
      try {
        const temp = [];
        const querySnapshot = await getDocs(collection(db, "savePost"));

        querySnapshot.forEach((doc) => {
          temp.push({ id: doc.id, ...doc.data() });
        });
        setSaveJobPost(temp);
      } catch (error) {
        console.log(error);
      }
    };

    setTimeout(() => {
      fetchSavePost();
    }, 1000);
  }, []);

  useEffect(() => {
    const filterSavedPost = saveJobPost.filter((job) => {
      return job.save_id === id;
    });
    setSaved(filterSavedPost);
  }, [saveJobPost, id]);

  const handleClickUnset = (id) => {
    dispatch(removePost(id));
    setBookMark(false);
    // console.log("unset");
    toast.success("post unsaved sucessfully");
  };

  const handleBookmarkClick = async () => {
    try {
      if (bookMark) {
        dispatch(removePost(saveJobPost.id));
        setBookMark(false);
        // console.log("unset");
        toast.success("post unsaved sucessfully");
      } else {
        const { jobDeadline, title, company, salary } = jobDetails;

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
        // console.log("set");
        toast.success("post save sucessfully");
      }
    } catch (error) {
      console.log("Error handling bookmark click:", error);
    }
  };

  // console.log(id, "applied job id");

  return (
    <>
      {isLoadding ? (
        <Loader />
      ) : (
        <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-20 w-full">
          {jobDetails && (
            <>
              <div className="flex justify-center items-center mb-6">
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
                          {jobDetails.company}
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
                          {jobDetails.email}
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
                          {jobDetails.location}
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
                          {jobDetails.jobCategory}
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
                          {jobDetails.jobType}
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
                          {jobDetails.salary} $ / month
                        </span>
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center mt-6">
                <div
                  onClick={handleBookmarkClick}
                  className="mr-4 cursor-pointer"
                >
                  {!bookMark ? (
                    <FaRegBookmark className="text-emerald-600 text-4xl" />
                  ) : (
                    <FaBookmark className="text-emerald-600 text-4xl" />
                  )}
                </div>
                {/* <button onClick={() => handleClickUnset(saved[0].id)}>unset</button> */}
                <div className="rounded-md bg-emerald-600 p-4 text-xl uppercase text-white hover:text-gray-800 cursor-pointer">
                  <NavLink to={`/appliedJob/${id}`}>Apply position</NavLink>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 gap-6 md:gap-8">
                <div className="p-4 bg-gray-100 rounded-lg hover:shadow-lg hover:transition-all hover:duration-300 hover:ease-linear">
                  <h1 className="font-bold text-xl text-emerald-600 mb-4">
                    Job Description
                  </h1>
                  <p>{jobDetails.description}</p>
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
                            {jobDetails.jobVacancy}
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
                            {jobDetails.jobDeadline}
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
                            {jobDetails.jobExperience}
                          </span>
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default DisplayDetails;
