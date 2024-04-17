import React, { useState, useEffect } from "react";
import { navItem, auth } from "../utils/utils";
import { NavLink, useNavigate } from "react-router-dom";
import { CgMenuRight } from "react-icons/cg";
import { MdOutlineClose } from "react-icons/md";

import { auth as Auth } from "../firebase";

import { SignOut } from "../auth";

const Header = () => {
  const [toggle, setToggle] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleActive = () => {
    setToggle(!toggle);
    console.log("button clicked....");
  };

  // console.log(isLoggedIn);

  useEffect(() => {
    try {
      Auth.onAuthStateChanged((user) => {
        if (user) {
          console.log("user is logged in");
          setIsLoggedIn(true);
          localStorage.setItem("token", user.refreshToken);
        } else {
          console.log("user is not logged in");
          setIsLoggedIn(false);
        }
        console.log(user);
      });
    } catch (error) {
      console.log(error);
    }

    return () => {};
  }, []);

  const navigate = useNavigate();
  const handleLogout = () => {
    SignOut();
    navigate("/login");
  };

  return (
    <header className="w-full py-5 sm:px-10 px-10 flex justify-between items-center bg-emerald-600 shadow-xl fixed">
      <nav className="navbar flex w-full ms-0 me-0 relative max-w-[1120px]">
        <h2 className="text-xl font-bold">JOBS</h2>
        <div className="center flex flex-1 justify-center max-sm:hidden max-md:hidden">
          {navItem.map((item) => (
            <NavLink
              to={`${item.link}`}
              key={item.name}
              className={({ isActive, isPending }) =>
                !isActive
                  ? "px-5 text-sm font-semibold uppercase cursor-pointer text-gray hover:text-white transition-all"
                  : "px-5 text-sm font-semibold uppercase cursor-pointer text-white "
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1 max-sm:hidden max-md:hidden">
          {!isLoggedIn ? (
            auth.map((item) => (
              <NavLink
                to={item.link}
                key={item.name}
                className={({ isActive, isPending }) =>
                  !isActive
                    ? "px-5 text-sm font-semibold uppercase cursor-pointer text-gray hover:text-white transition-all"
                    : "px-5 text-sm font-semibold uppercase cursor-pointer text-white "
                }
              >
                {item.name}
              </NavLink>
            ))
          ) : (
            <button
              onClick={handleLogout}
              className="px-5 text-sm font-semibold uppercase cursor-pointer text-gray hover:text-white transition-all"
            >
              Sign Out
            </button>
          )}
        </div>

        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1 max-sm:hidden"></div>
      </nav>
      <div className="md:hidden">
        <CgMenuRight onClick={toggleActive} />
      </div>

      <div
        className={
          toggle
            ? "fixed md:hidden left-0 top-0 w-[65%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        <div className="flex justify-between items-center text-emerald-600">
          <h1 className="w-full text-3xl font-bold  m-4 ">Job board</h1>
          <MdOutlineClose onClick={toggleActive} size={30} className="m-3" />
        </div>
        <ul>
          {navItem.map((item) => (
            <li
              key={item.id}
              className="p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black text-white cursor-pointer border-gray-600"
            >
              <NavLink to={`${item.link}`}>{item.name}</NavLink>
            </li>
          ))}
        </ul>
        <ul>
          {!isLoggedIn ? (
            auth.map((item) => (
              <li
                key={item.id}
                className="p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black text-white cursor-pointer border-gray-600"
              >
                <NavLink to={`${item.link}`}>{item.name}</NavLink>
              </li>
            ))
          ) : (
            <li className="p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black text-white cursor-pointer border-gray-600">
              {/* <NavLink to={"/logout"}>Sign Out</NavLink> */}
              <button onClick={handleLogout}>Sign Out</button>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
