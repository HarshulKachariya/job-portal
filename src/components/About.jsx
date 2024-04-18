import React from "react";

const AboutPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center pt-20">
      <div className="container mx-auto px-4 py-8 flex flex-col gap-3 mt-3">
        <div className="max-w-md mx-auto text-center p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            About Us
          </h1>
          <p className="text-lg text-gray-700 mb-12 text-center">
            Welcome to our job board website! We are dedicated to helping job
            seekers find their dream jobs and connecting employers with top
            talent. Our mission is to make the job search process easier,
            faster, and more efficient for everyone involved.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="max-w-md mx-auto text-center p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700">
              Our mission is to empower job seekers by providing them with
              access to a wide range of job opportunities and resources to
              enhance their career growth. We aim to facilitate seamless
              connections between employers and job seekers, fostering a
              mutually beneficial relationship.
            </p>
          </div>
          <div className="max-w-md mx-auto text-center p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-700">
              Our vision for the job portal is to become the leading platform
              for job seekers and employers alike, revolutionizing the way
              people find and fill job positions. We aspire to create an
              inclusive and dynamic environment where talent meets opportunity,
              driving innovation and growth in the job market.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
