import React, { useState, useEffect } from "react";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { AiOutlineFileDone, AiOutlineDelete } from "react-icons/ai";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import { removePost, removeApplyPost } from "../store/AppliedJobSlice";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { filterSavePost, filterAppliedPost } = useAuth();

  const [toggle, setToggle] = useState(false);

  const dispatch = useDispatch();

  const handleClickRemove = (id) => {
    dispatch(removePost(id));
    toast.success("post unsaved sucessfully");
  };
  const handleClickRemoveApply = (id) => {
    dispatch(removeApplyPost(id));
    toast.success("post unsaved sucessfully");
  };

  const toggleClick = () => {
    setToggle(true);
  };

  const toggleClick1 = () => {
    setToggle(false);
  };

  return (
    <div className="py-20">
      <div className="top flex justify-center items-center gap-3 md:flex-row flex-wrap mt-5 ">
        <div
          className=" h-32 rounded-md border-b-2 border-emerald-600 w-56 bg-neutral-100 flex items-center justify-center gap-3 p-2 cursor-pointer transition-all duration-1000   hover:shadow-xl"
          onClick={toggleClick}
        >
          <AiOutlineFileDone className="text-4xl text-emerald-600" />
          <div className="text-xl font-semibold">
            <h1 className="">Top Applied </h1>
            <span className="">{filterAppliedPost.length}</span>
          </div>
        </div>
        <div
          onClick={toggleClick1}
          className="top h-32 rounded-md border-b-2 border-indigo-600 w-56 bg-neutral-100 flex items-center justify-center gap-3 p-2 cursor-pointer transition-all duration-1000   hover:shadow-xl"
        >
          <BsFillBookmarkStarFill className="text-4xl text-emerald-600" />
          <div className="text-xl font-semibold">
            <h1 className="">Top Saved jobs </h1>
            <span className="">{filterSavePost.length}</span>
          </div>
        </div>
      </div>
      {toggle ? (
        <div className="bottom h-screen w-full bg-neutral-100 mt-5 mb-5 p-5">
          <h1 className="text-2xl ">
            Total Applied Jobs: {filterAppliedPost.length}
          </h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="center">Apply Date</TableCell>
                  <TableCell align="center">Job Title</TableCell>
                  <TableCell align="center">Company</TableCell>
                  <TableCell align="center">Job Salary</TableCell>
                  <TableCell align="center">Action</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterAppliedPost.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell></TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {row.jobDeadline}
                    </TableCell>
                    <TableCell align="center">{row.title}</TableCell>
                    <TableCell align="center">{row.company}</TableCell>
                    <TableCell align="center">{row.salary}</TableCell>
                    <TableCell align="center">
                      <button onClick={() => handleClickRemoveApply(row.id)}>
                        <AiOutlineDelete
                          size={20}
                          className="text-center text-red-700"
                        />
                      </button>
                    </TableCell>
                    <TableCell align="center">
                      <NavLink
                        to={`/details/${row.id}`}
                        className="border-emerald-600 border p-1 rounded-md hover:text-white hover:bg-emerald-600"
                      >
                        {row.status}
                      </NavLink>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <div className="bottom h-screen w-full bg-neutral-100 mt-5 mb-5 p-5">
          <h1 className="text-2xl ">
            Total save Jobs: {filterSavePost.length}
          </h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="center">Apply Date</TableCell>
                  <TableCell align="center">Job Title</TableCell>
                  <TableCell align="center">Company</TableCell>
                  <TableCell align="center">Job Salary</TableCell>
                  <TableCell align="center">Action</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterSavePost.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell></TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {row.jobDeadline}
                    </TableCell>
                    <TableCell align="center">{row.title}</TableCell>
                    <TableCell align="center">{row.company}</TableCell>
                    <TableCell align="center">{row.salary}</TableCell>
                    <TableCell align="center">
                      <button onClick={() => handleClickRemove(row.id)}>
                        <AiOutlineDelete
                          size={20}
                          className="text-center text-red-700"
                        />
                      </button>
                    </TableCell>
                    <TableCell align="center">
                      <NavLink
                        to={`/details/${row.save_id}`}
                        className="border-emerald-600 border p-1 rounded-md hover:text-white hover:bg-emerald-600"
                      >
                        view details
                      </NavLink>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
