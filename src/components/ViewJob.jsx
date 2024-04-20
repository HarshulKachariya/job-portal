import React, { useEffect, useState } from "react";
import Card from "./Card";

import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

import { ThreeDots } from "react-loader-spinner";
import { Tuple } from "@reduxjs/toolkit";
import Loader from "./Loader";

const ViewJob = () => {
  const [jobs, setJobs] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const tempJobs = [];
        const querySnapshot = await getDocs(collection(db, "job-listing"));
        querySnapshot.forEach((doc) => {
          tempJobs.push({ data: doc.data(), id: doc.id });
        });
        setJobs(tempJobs);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    // console.log(jobs);

    setTimeout(() => {
      fetchSavedJobs();
      // querySnapshot();
    }, 1000);
  }, []);

  return (
    <div className="px-10 sm:px-10 py-20 md:px-10 w-full h-full">
      <h1 className="px-4 mx-2 py-2 uppercase tracking-wider border-b-2 border-b-emerald-600 text-3xl font-semibold">
        Available Jobs
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {isLoading ? (
          <Loader />
        ) : (
          jobs.map((job) => <Card key={job.id} {...job.data} id={job.id} />)
        )}
      </div>
    </div>
  );
};

export default ViewJob;
