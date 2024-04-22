import React, { useState } from "react";
import InputBox from "./InputBox";
import { RxCross2 } from "react-icons/rx";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import TextArea from "./TextArea";

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    salary: "",
    email: "",
    company: "",
    description: "",
    jobCategory: "",
    jobType: "fullTime",
    jobExperience: "",
    jobVacancy: "",
    jobDeadline: "",
    skills: [],
    newSkill: "",
  });

  // get userID from auth firebase
  const uid = auth.currentUser.uid;
  // console.log(uid);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = {
        ...formData,
        uid: uid,
        created_at: serverTimestamp(),
        jobCategory: formData.jobCategory.split(",").map((cat) => cat.trim()),
      };
      await addDoc(collection(db, "job-listing"), formDataToSend);
      toast.success("Job posting added successfully!");
      // console.log(formDataToSend);
      setFormData({
        title: "",
        salary: "",
        email: "",
        company: "",
        description: "",
        jobCategory: "",
        jobLocation: "",
        jobType: "fullTime",
        jobExperience: "",
        jobVacancy: "",
        jobDeadline: "",
        skills: [],
        newSkill: "",
      });
    } catch (error) {
      console.log(error);
    }

    // Send formDataToSend to your backend or Firebase database
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSkillChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      newSkill: e.target.value,
    }));
  };

  const addSkill = () => {
    if (formData.newSkill.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        skills: [...prevData.skills, prevData.newSkill.trim()],
        newSkill: "",
      }));
    }
  };

  const removeSkill = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      skills: prevData.skills.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="px-10 sm:px-10 py-20 md:px-10 ">
      <h1 className="text-3xl font-semibold text-center mb-6 uppercase">
        enter job details
      </h1>
      <div className="max-w-lg mx-auto">
        <form
          className="w-full h-full flex flex-col gap-2 justify-center items-center md:justify-center md:items-center"
          onSubmit={handleSubmit}
        >
          <label className="items-start">Title:</label>
          <InputBox
            type="text"
            onFocus={"title"}
            value={formData.title}
            onChange={handleChange}
            placeholder={"Enter title of job"}
            id="title"
          />
          <label>Salary:</label>
          <InputBox
            type="number"
            onFocus={"salary"}
            value={formData.salary}
            onChange={handleChange}
            placeholder={"Enter salary for this job"}
            id="salary"
          />
          <label>Email:</label>
          <InputBox
            type="email"
            onFocus={"email"}
            value={formData.email}
            onChange={handleChange}
            placeholder={"Enter an email contact for this job"}
            id="email"
          />
          <label>Company:</label>
          <InputBox
            type="text"
            onFocus={"company"}
            value={formData.company}
            onChange={handleChange}
            placeholder={"Enter company of job"}
            id="company"
          />
          <label>Description:</label>
          <TextArea
            onFocus={"description"}
            value={formData.description}
            onChange={handleChange}
            placeholder={"Enter job description"}
            rows="4"
            cols="50"
            id="description"
            className="w-full p-3 border-[1px] rounded-md border-emerald-600 "
            required
          />
          <label>Job Category (Comma separated):</label>
          <InputBox
            type="text"
            onFocus={"jobCat"}
            value={formData.jobCategory}
            onChange={handleChange}
            placeholder={"e.g., Software Engineering, Marketing"}
            id="jobCategory"
          />
          <label>Job Location:</label>
          <InputBox
            type="text"
            onFocus={"jobLocation"}
            value={formData.jobLocation}
            onChange={handleChange}
            placeholder={"e.g., NYC"}
            id="jobLocation"
          />
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            id="jobType"
            className="w-full p-3 border-[1px] rounded-md border-emerald-600 "
          >
            <option value="fullTime">Full Time</option>
            <option value="partTime">Part Time</option>
            <option value="internship">Internship</option>
            <option value="contract">Contract</option>
          </select>
          <label>Job Experience:</label>
          <InputBox
            type="text"
            onFocus={"jobEx"}
            value={formData.jobExperience}
            onChange={handleChange}
            placeholder={"Enter required job experience"}
            id="jobExperience"
          />
          <label>Job Vacancy:</label>
          <InputBox
            type="number"
            min="0"
            onFocus={"jobVacancy"}
            value={formData.jobVacancy}
            onChange={handleChange}
            id="jobVacancy"
          />
          <label>Job Deadline:</label>
          <InputBox
            type="date"
            onFocus={"jobDeadline"}
            value={formData.jobDeadline}
            onChange={handleChange}
            placeholder={"Enter date of job deadline"}
            id="jobDeadline"
          />
          <label>Add Skill:</label>
          <div className="flex flex-1 w-full gap-2">
            <InputBox
              type="text"
              value={formData.newSkill}
              onChange={handleSkillChange}
            />
            <button
              type="button"
              className="w-[30%] p-3 border-[1px] text-white rounded-md bg-emerald-600"
              onClick={addSkill}
            >
              Add
            </button>
          </div>
          {formData.skills.length > 0 && (
            <div className="flex flex-row w-full gap-1">
              <label>Selected Skills:</label>
              <ul className="flex flex-row gap-1 overflow-hidden flex-wrap">
                {formData.skills.map((skill, index) => (
                  <li
                    key={index}
                    className="flex flex-1 gap-1 justify-center items-center border-2 rounded-md border-emerald-600 p-1"
                  >
                    {skill}
                    <RxCross2
                      onClick={() => removeSkill(index)}
                      className=" text-emerald-600"
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button className="w-full p-3 border-[1px] text-white rounded-md bg-emerald-600 ">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
