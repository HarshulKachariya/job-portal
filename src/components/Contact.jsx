import React, { useState } from "react";
import InputBox from "./InputBox";

import { db } from "../firebase";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import TextArea from "./TextArea";

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
      toast.success("message sent successfully");
    } catch (error) {
      console.log(error);
    }

    // console.log(formData);
  };

  return (
    <section className="px-6  py-24 md:px-10">
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
            placeholder={"Enter a email to contact you"}
            id="email"
          />
          <label>Message:</label>
          <TextArea
            type="textarea"
            name=""
            onFocus={"description"}
            value={formData.message}
            onChange={handleChange}
            placeholder={"Type your Message..."}
            rows="4"
            cols="50"
            id="message"
            className="w-full p-3 border-[1px] rounded-md border-emerald-600 "
            required
          />

          <button className="w-full p-3 border-[1px] text-white rounded-md bg-emerald-600 ">
            Submit
          </button>
        </form>
      </div>

      <div className="flex flex-col md:flex-row items-baseline md:items-baseline md:justify-center md:gap-6 gap-3 justify-center  mt-5">
        <div className="mb-4 ">
          <p className="font-semibold">Company Email:</p>
          <p>enqiry@jobportal.com</p>
        </div>
        <div className="">
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
