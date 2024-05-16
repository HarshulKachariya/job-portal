import React, { useEffect, useState } from "react";
import Card from "./Card";

import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";

const ViewJob = () => {
  const [jobs, setJobs] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const { jobDetails } = useAuth();

  useEffect(() => {
    setJobs(jobDetails);
    setIsLoading(false);
    console.log(jobDetails);
  }, [jobDetails]);

  return (
    <div className="px-6 py-24 ">
      <h1 className="px-4 mx-2 py-2 uppercase tracking-wider border-b-2 border-b-emerald-600 md:text-3xl  text-2xl font-semibold">
        Available Jobs
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 ">
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
