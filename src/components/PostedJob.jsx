import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory hook for redirection
import Card from "./Card";
import { auth, db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { ThreeDots } from "react-loader-spinner";
import { useAuth } from "../context/AuthContext";

import Loader from "./Loader";

const PostedJob = () => {
  const navigate = useNavigate(); // Initialize useHistory hook
  const { jobDetails } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState([]);

  const [loading, setLoading] = useState(true);

  const user = auth.currentUser;
  const userId = user ? user.uid : null;

  useEffect(() => {
    setJobs(jobDetails);
    setLoading(false);
  }, []);

  useEffect(() => {
    const temp = [];
    const fetchJobByUserId = () => {
      jobs.forEach((job) => {
        if (job.data.uid === userId) {
          temp.push(job);
        }
      });
      setFilter(temp);
    };

    if (userId) {
      fetchJobByUserId();
    }
  }, [userId, jobs]);

  // Function to handle redirection to PostAJob page with pre-filled values
  const redirectToEditJob = (jobId) => {
    // Construct the URL with query parameters
    // const url = `/postAJob?jobId=${jobId}`;
    navigate(`/postAJob/${jobId}`); // Redirect to the PostAJob page
  };

  return (
    <div className="px-10 sm:px-10 py-20 md:px-10 w-full h-full">
      <h1 className="px-4 mx-2 py-2 uppercase tracking-wider border-b-2 border-b-emerald-600 text-3xl font-semibold">
        Posted Jobs
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {loading ? (
          <Loader />
        ) : filter.length > 0 ? (
          filter.map((job) => (
            <div onClick={() => redirectToEditJob(job.id)}>
              <Card
                key={job.id}
                {...job.data}
                id={job.id}
                // Pass a click event handler to trigger redirection
              />
            </div>
          ))
        ) : (
          <h1 className="w-screen h-screen text-center text-2xl font-semibold">
            No Jobs Posted
          </h1>
        )}
      </div>
    </div>
  );
};

export default PostedJob;
