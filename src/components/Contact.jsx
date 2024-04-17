import React, { useState } from "react";
import InputBox from "./InputBox";

import { db } from "../firebase";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const companyInfo = {
    email: "company@example.com",
    phoneNumber: "+1234567890",
    address: "123 Company St, City, Country",
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "contactus"), {
        ...formData,
        created_at: serverTimestamp(),
      });
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      console.log("message sent successfully");
    } catch (error) {
      console.log(error);
    }

    // console.log(formData);
  };

  return (
    <section className="px-10 sm:px-10 py-20 md:px-10">
      <h1 class="text-3xl font-semibold text-center mb-6 uppercase">
        Contact us
      </h1>
      <div className="max-w-lg mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col gap-2 justify-center items-center"
        >
          <label>Fullname:</label>
          <InputBox
            type="text"
            name=""
            onFocus={"fname"}
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
            value={formData.email}
            onChange={handleChange}
            placeholder={"Enter a email contacted for this job"}
            id="email"
          />
          <label>Message:</label>
          <textarea
            type="textarea"
            name=""
            onFocus={"description"}
            value={formData.message}
            onChange={handleChange}
            placeholder={"Enter job  description"}
            rows="4"
            cols="50"
            id="message"
            className="w-full p-3 border-[1px] rounded-md border-emerald-600 "
          />

          <button className="w-full p-3 border-[1px] text-white rounded-md bg-emerald-600 ">
            Submit
          </button>
        </form>
      </div>

      <div className="flex flex-row gap-3 justify-center items-center mt-5">
        <div className="mb-4">
          <p className="font-semibold">Company Email:</p>
          <p>enqiry@jobportal.com</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Phone Number:</p>
          <p>+91-9872536821</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Address:</p>
          <p>221-Avalon, surat-395004</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
