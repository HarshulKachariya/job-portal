import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 bottom-0  w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">Company</h2>
            <ul className="space-y-2">
              <li>
                <NavLink to="/about">About Us</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact Us</NavLink>
              </li>
              <li>
                <NavLink to="/viewJob">Availble jobs</NavLink>
              </li>
              <li></li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Resources</h2>
            <ul className="space-y-2 flex flex-col">
              <NavLink to={`faqs`}>FAQs</NavLink>
              <NavLink to={`privacyAndPolicy`}>Privacy Policy</NavLink>
              <NavLink to={`termOfService`}>Terms of Service</NavLink>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-400">
                <FaGithub size={24} />
              </a>
              <a href="#" className="hover:text-gray-400">
                <FaLinkedin size={24} />
              </a>
              <a href="#" className="hover:text-gray-400">
                <FaTwitter size={24} />
              </a>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Subscribe</h2>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 border border-gray-700 rounded px-4 py-2 w-48 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 Job Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
