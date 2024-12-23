import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import React, { createContext, useState, useContext, useEffect } from "react";

import { auth, db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [jobDetails, setJobDetails] = useState([]);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [appliedJobPost, setAppliedPost] = useState([]);
  const [filterSavePost, setFilterSavePost] = useState([]);
  const [filterAppliedPost, setFilterAppliedPost] = useState([]);
  const userId = user ? user.uid : null;

  // Redirect unauthenticated users to login page
  // useEffect(() => {
  //   if (!user && !userId) {
  //     window.location.href = "/login";
  //   }
  // }, [user, userId]);

  const LogIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const SignUp = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    auth.signOut();
  };

  // Track user authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => setUser(user));
    return unsubscribe;
  }, []);

  // Fetch job details
  useEffect(() => {
    let isMounted = true;

    const fetchJobDetails = async () => {
      try {
        const tempJob = [];
        const querySnapshot = await getDocs(collection(db, "job-listing"));
        querySnapshot.forEach((doc) => {
          tempJob.push({ data: doc.data(), id: doc.id });
        });
        if (isMounted) setJobDetails(tempJob);
      } catch (error) {
        console.log(error);
      }
    };

    if (jobDetails.length === 0) {
      fetchJobDetails();
    }

    return () => {
      isMounted = false;
    };
  }, [jobDetails]);

  // Fetch bookmarked and applied jobs
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        if (userId) {
          const tempJobs = [];
          const querySnapshot = await getDocs(collection(db, "savePost"));
          querySnapshot.forEach((doc) => {
            tempJobs.push({ id: doc.id, ...doc.data() });
          });
          if (isMounted) setBookmarkedJobs(tempJobs);

          const tempAppliedJobs = [];
          const querySnapshots = await getDocs(collection(db, "application"));
          querySnapshots.forEach((doc) => {
            tempAppliedJobs.push({ id: doc.id, ...doc.data() });
          });
          if (isMounted) setAppliedPost(tempAppliedJobs);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    if (userId && bookmarkedJobs.length === 0 && appliedJobPost.length === 0) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [userId, bookmarkedJobs, appliedJobPost]);

  // Filter bookmarked jobs by user ID
  useEffect(() => {
    if (userId) {
      const filteredJobs = bookmarkedJobs.filter(
        (job) => job.userId === userId
      );
      setFilterSavePost(filteredJobs);
    }
  }, [bookmarkedJobs, userId]);

  // Filter applied jobs by user ID
  useEffect(() => {
    if (userId) {
      const filteredJobs = appliedJobPost.filter(
        (job) => job.userId === userId
      );
      setFilterAppliedPost(filteredJobs);
    }
  }, [appliedJobPost, userId]);

  const value = {
    SignUp,
    LogIn,
    user,
    logout,
    jobDetails,
    bookmarkedJobs,
    appliedJobPost,
    filterSavePost,
    filterAppliedPost,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
