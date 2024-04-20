import React, { useState, useEffect } from "react";
import InputBox from "./InputBox";
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
import TextArea from "./TextArea";

const Contact = () => {
  const user = auth.currentUser;
  const userId = user ? user.uid : null;
  const { id } = useParams();
  // console.log(id, userId);
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const docRef = doc(db, "job-listing", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setJobDetails(docSnap.data());
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
  // console.log(jobDetails);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    about: "",
    file: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { jobDeadline, title, company, salary } = jobDetails;
      await addDoc(collection(db, "application"), {
        ...formData,
        applied_job_id: id,
        userId,
        jobDeadline,
        title,
        company,
        salary,
        created_at: serverTimestamp(),
      });
      setFormData({
        name: "",
        email: "",
        about: "",
        file: "",
      });
      toast.success("application sent sucessfully");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }

    // console.log(formData);
  };

  return (
    <section className="px-10 sm:px-10 py-20 md:px-10">
      <h1 class="text-3xl font-semibold text-center mb-6 uppercase">
        add your info
      </h1>
      <div className="max-w-lg mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col gap-2 justify-center items-center"
        >
          <label>Fullname:</label>
          <InputBox
            type="text"
            name="name"
            onFocus={"name"}
            value={formData.name}
            onChange={handleChange}
            placeholder={"Enter title of job"}
            id="name"
          />
          <label>Email:</label>
          <InputBox
            type="email"
            name=""
            onFocus={"email"}
            value={auth.currentUser.email}
            onChange={() => {}}
            placeholder={"Enter a email contacted for this job"}
            id="email"
          />

          <label>About:</label>
          <TextArea
            type="textarea"
            name="about"
            onFocus={"about"}
            value={formData.about}
            onChange={handleChange}
            placeholder={"About Your Self"}
            rows="4"
            cols="50"
            id="about"
            className="w-full p-3 border-[1px] rounded-md border-emerald-600 "
            required
          />
          <label>Upload CV:</label>
          <InputBox
            type="file"
            name="file"
            accept=".pdf"
            onFocus={"file"}
            value={formData.file}
            onChange={handleChange}
            placeholder={"upload cv contacted for this job"}
            id="file"
          />

          <button className="w-full p-3 border-[1px] text-white rounded-md bg-emerald-600 ">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
