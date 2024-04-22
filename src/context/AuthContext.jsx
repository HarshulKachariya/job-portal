import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import React, { createContext, useState, useContext, useEffect } from "react";

import { auth, db } from "../firebase";

import { collection, getDocs, addDoc, doc } from "firebase/firestore";

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
  // console.log(user);

  const LogIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const users = auth.currentUser;
          const token = await users.getIdToken();
          console.log(token);
          setUser(users);
          localStorage.setItem("token", token);
        } else {
          console.log("not Sign In");
        }
      });
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

  useEffect(() => {
    const currentUser = () => {
      auth.onAuthStateChanged((user) => setUser(user));
    };
    currentUser();
  }, []);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const tempJob = [];
        const querySnapshot = await getDocs(collection(db, "job-listing"));
        querySnapshot.forEach((doc) => {
          tempJob.push({ data: doc.data(), id: doc.id });
        });
        setJobDetails(tempJob);
      } catch (error) {
        console.log(error);
      }
    };

    setTimeout(() => {
      fetchJobDetails();
    }, 300);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const tempJobs = [];
          const querySnapshot = await getDocs(collection(db, "savePost"));
          querySnapshot.forEach((doc) => {
            tempJobs.push({ id: doc.id, ...doc.data() });
          });
          setBookmarkedJobs(tempJobs);

          const tempAppliedJobs = [];
          const querySnapshots = await getDocs(collection(db, "application"));

          querySnapshots.forEach((doc) => {
            tempAppliedJobs.push({ id: doc.id, ...doc.data() });
          });
          setAppliedPost(tempAppliedJobs);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    setTimeout(() => {
      fetchData();
    }, 300);
  }, [userId]);

  useEffect(() => {
    if (userId) {
      // Filter bookmarked jobs for the current user
      const filteredJobs = bookmarkedJobs.filter(
        (job) => job.userId === userId
      );
      setFilterSavePost(filteredJobs);
    }
  }, [bookmarkedJobs, userId]);

  useEffect(() => {
    if (userId) {
      // Filter bookmarked jobs for the current user
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
