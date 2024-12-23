import React, { useState, useEffect } from "react";
import InputBox from "./InputBox";
import TextArea from "./TextArea";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  getDoc,
  doc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { toast } from "react-toastify";

const Contact = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    about: "",
    file: "",
    status: "pending",
  });
  const [jobDetails, setJobDetails] = useState(null);

  // Check user authentication and redirect if not authenticated
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      navigate("/login");
    } else {
      setFormData((prevData) => ({ ...prevData, email: currentUser.email }));
    }
  }, [navigate]);

  // Fetch job details based on the ID from URL params
  useEffect(() => {
    const fetchJobDetails = async () => {
      if (id) {
        try {
          const jobRef = doc(db, "job-listing", id);
          const jobSnap = await getDoc(jobRef);
          if (jobSnap.exists()) {
            setJobDetails(jobSnap.data());
          } else {
            console.error("Job not found.");
          }
        } catch (error) {
          console.error("Error fetching job details:", error);
        }
      }
    };

    fetchJobDetails();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jobDetails) {
      toast.error("Job details not loaded.");
      return;
    }

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        navigate("/login");
        return;
      }

      const applicationData = {
        ...formData,
        applied_job_id: id,
        userId: currentUser.uid,
        jobDeadline: jobDetails.jobDeadline,
        title: jobDetails.title,
        company: jobDetails.company,
        salary: jobDetails.salary,
        createJobUserId: jobDetails.uid,
        created_at: serverTimestamp(),
      };

      await addDoc(collection(db, "application"), applicationData);
      toast.success("Application sent successfully.");
      setFormData({
        name: "",
        email: currentUser.email,
        about: "",
        file: "",
        status: "pending",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to send application.");
    }
  };

  return (
    <section className="px-10 sm:px-10 py-20 md:px-10">
      <h1 className="text-3xl font-semibold text-center mb-6 uppercase">
        Add Your Info
      </h1>
      <div className="max-w-lg mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col gap-2 justify-center items-center"
        >
          <label htmlFor="name">Full Name:</label>
          <InputBox
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />

          <label htmlFor="email">Email:</label>
          <InputBox
            type="email"
            id="email"
            value={formData.email}
            readOnly
            placeholder="Your email address"
          />

          <label htmlFor="about">About:</label>
          <TextArea
            id="about"
            value={formData.about}
            onChange={handleChange}
            placeholder="Tell us about yourself"
            rows="4"
            className="w-full p-3 border-[1px] rounded-md border-emerald-600"
            required
          />

          <label htmlFor="file">Upload CV:</label>
          <InputBox
            type="file"
            id="file"
            accept=".pdf"
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                file: e.target.files[0],
              }))
            }
          />

          <button className="w-full p-3 border-[1px] text-white rounded-md bg-emerald-600">
            Send Application
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
