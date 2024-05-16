import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import ImageCard from "./ImageCard";
import { NavLink } from "react-router-dom";

const Card = ({ salary, jobDeadline, title, id, company, email }) => {
  return (
    <div>
      <div className="top w-full cursor-pointer transition-all duration-1000 md:w-[90%] m-4 border hover:shadow-xl rounded px-4 md:flex md:flex-wrap">
        <div className="left mb-4 flex items-center justify-center py-2">
          <img
            src="https://randomuser.me/api/portraits/men/67.jpg"
            alt="profile"
            className="w-20 h-20 rounded-full"
          />
          <div className="flex flex-col mx-2 px-2">
            <h3 className="text-xl md:text-2xl font-semibold">{company}</h3>
            <h4 className="text-xs sm:text-sm md:text-base text-gray-800">
              {email}
            </h4>
          </div>
        </div>

        <div className="right mb-4 flex items-start justify-center py-2 flex-col">
          <div className="flex px-2 py-2 flex-row items-center justify-center">
            <li className="text-2xl font-extrabold text-emerald-600"></li>
            <h1 className="text-gray-900 text-lg">
              Salary :{" "}
              <span className="font-semibold text-base">{salary}$ / Month</span>
            </h1>
          </div>
          <div className="flex px-2 py-2 flex-row items-center justify-center">
            <li className="top-0 text-2xl font-extrabold text-emerald-600"></li>
            <h1>
              Deadline :{" "}
              <span className="font-semibold text-base">{jobDeadline}</span>
            </h1>
          </div>
        </div>
        <div className="bottom mb-4 flex flex-col md:flex-wrap md:flex-row w-full justify-between items-center">
          <span className="flex px-6 rounded-2xl py-1 items-center justify-center bg-emerald-200 text-emerald-900">
            {title}
          </span>
          <NavLink to={`/details/${id}`}>
            <button className="my-2 py-2 px-4 border border-emerald-600 rounded flex items-center justify-center transition-all duration-700 hover:bg-emerald-600 hover:text-white text-emerald-600 font-semibold">
              View Details <AiOutlineArrowRight className="mx-2 text-xl" />
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Card;
