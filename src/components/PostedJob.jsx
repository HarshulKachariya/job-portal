import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import { auth, db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { ThreeDots } from "react-loader-spinner";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";

const PostedJob = () => {
  const navigate = useNavigate();
  const { jobDetails } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = auth.currentUser;
  const userId = user ? user.uid : null;

  useEffect(() => {
    setJobs(jobDetails);
    setLoading(false);
  }, []);

  const filteredJobs = useMemo(() => {
    const temp = [];
    if (userId) {
      jobs.forEach((job) => {
        if (job.data.uid === userId) {
          temp.push(job);
        }
      });
    }
    return temp;
  }, [jobs, userId]);

  const redirectToEditJob = (jobId) => {
    navigate(`/postAJob/${jobId}`);
  };

  return (
    <div className="px-6 py-24">
      <h1 className="px-4 mx-2 py-2 uppercase tracking-wider border-b-2 border-b-emerald-600 md:text-3xl  text-2xl font-semibold">
        Posted Jobs
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        {loading ? (
          <Loader />
        ) : filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job.id} onClick={() => redirectToEditJob(job.id)}>
              <Card {...job.data} id={job.id} />
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center mt-5">
            <h1 className=" text-2xl font-semibold ">No Jobs Posted</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostedJob;
