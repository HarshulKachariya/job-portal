import React, { useState, useEffect } from "react";
import Card from "./Card";
import { auth, db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { ThreeDots } from "react-loader-spinner";
import Loader from "./Loader";
const PostedJob = () => {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState([]);

  const [loading, setLoading] = useState(true);

  const user = auth.currentUser;
  const userId = user ? user.uid : null;

  const fetchJobs = async () => {
    try {
      const tempJobs = [];
      const querySnapshot = await getDocs(collection(db, "job-listing"));
      querySnapshot.forEach((doc) => {
        tempJobs.push({ data: doc.data(), id: doc.id });
      });
      setJobs(tempJobs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

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

  // console.log(filter);

  useEffect(() => {
    fetchJobs();
  }, []);
  return (
    <div className="px-10 sm:px-10 py-20 md:px-10 w-full h-full">
      <h1 className="px-4 mx-2 py-2 uppercase tracking-wider border-b-2 border-b-emerald-600 text-3xl font-semibold">
        Posted Jobs
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {loading ? (
          <Loader />
        ) : (
          filter.map((job) => <Card key={job.id} {...job.data} id={job.id} />)
        )}
      </div>
    </div>
  );
};

export default PostedJob;
