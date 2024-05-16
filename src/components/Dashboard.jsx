import React, { useState, useEffect, useMemo } from "react";
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
import { auth, db } from "../firebase";
import {
  getDocs,
  updateDoc,
  doc,
  addDoc,
  collection,
  query,
  where,
} from "firebase/firestore";

const Dashboard = () => {
  const { filterSavePost, filterAppliedPost } = useAuth();
  const user = useMemo(() => auth.currentUser, []);
  const userId = useMemo(() => (user ? user.uid : null), []);

  const [toogleModel, setToogleModel] = useState(false);

  const [toggle, setToggle] = useState(false);
  const [applications, setApplications] = useState([]);

  // const [status, setstatus] = useState(null);

  useEffect(() => {
    const fetchApplicationDetails = async () => {
      try {
        const q = query(
          collection(db, "application"),
          where("createJobUserId", "==", userId)
        );
        const querySnapshots = await getDocs(q);
        const tempApplications = [];

        querySnapshots.forEach((doc) => {
          tempApplications.push({ id: doc.id, ...doc.data() });
        });

        setApplications(tempApplications);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    if (userId) {
      fetchApplicationDetails();
    }
  }, [filterAppliedPost, filterSavePost]);

  const dispatch = useDispatch();

  const handleClickRemove = (id) => {
    dispatch(removePost(id));
    toast.success("Post unsaved successfully");
  };

  const handleClickRemoveApply = (id) => {
    dispatch(removeApplyPost(id));
    toast.success("Post unsaved successfully");
  };

  const toggleClick = () => {
    setToggle(true);
    setToogleModel(false);
  };

  const toggleClick1 = () => {
    setToggle(false);
    setToogleModel(false);
  };

  const toggleClick2 = () => {
    setToogleModel(true);
  };

  const onStatusValueChange = async (e, id) => {
    const newStatus = e.target.value;

    try {
      await updateDoc(doc(db, "application", id), {
        status: newStatus,
      });
      toast.success("Status updated successfully");
    } catch (error) {
      toast.error("Error updating status", error);
      console.log(id);
    }
  };
  // console.log(applications);

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
        <div
          onClick={toggleClick2}
          className="top h-32 rounded-md border-b-2 border-zinc-600 w-56 bg-neutral-100 flex items-center justify-center gap-3 p-2 cursor-pointer transition-all duration-1000   hover:shadow-xl"
        >
          <BsFillBookmarkStarFill className="text-4xl text-emerald-600" />
          <div className="text-xl font-semibold">
            <h1 className="">Applications </h1>
            <span className="">{applications.length}</span>
          </div>
        </div>
      </div>
      {toggle || toogleModel == "false" ? (
        <div
          className={`bottom h-screen w-full bg-neutral-100 mt-5 mb-5 p-5 ${
            !toogleModel ? " block" : "hidden"
          }`}
        >
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
                  <TableCell align="center">Status</TableCell>
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
                      <div
                        className={` border p-2 rounded-md cursor-default text-md capitalize  ${
                          row.status === "approve"
                            ? "bg-green-300 text-green-700"
                            : "" || row.status === "reject"
                            ? "bg-red-300 text-red-700"
                            : "" || row.status === "interview"
                            ? "bg-yellow-400"
                            : "" || row.status === "offer"
                            ? "bg-green-400"
                            : "" || row.status === "pending"
                            ? "bg-zinc-400"
                            : ""
                        }`}
                      >
                        {row.status}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <div
          className={`bottom h-screen w-full bg-neutral-100 mt-5 mb-5 p-5 ${
            !toogleModel ? " block" : "hidden"
          }`}
        >
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
                  <TableCell align="center">Details</TableCell>
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
                        className="border-emerald-600 w-full border p-2 capitalize rounded-md hover:text-white hover:bg-emerald-600"
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

      {toogleModel ? (
        <div className="bottom h-screen w-full bg-neutral-100 mt-5 mb-5 p-5">
          <h1 className="text-2xl">Total Applications for Posted Jobs</h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Job Title</TableCell>
                  <TableCell align="center">Company</TableCell>
                  <TableCell align="center">Applicant Name</TableCell>
                  <TableCell align="center">Applicant status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applications?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell align="center">{item.company}</TableCell>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">
                      <span className="">
                        <select
                          name=""
                          id=""
                          className={` bg-slate-100 outline-none p-2  rounded-lg text-md   capitalize `}
                          onChange={(e) => onStatusValueChange(e, item.id)}
                        >
                          <option value="pending">{item.status}</option>
                          <option value="approve">Approve</option>
                          <option value="reject">Reject</option>
                          <option value="interview">Interview</option>
                          <option value="offer">Offer</option>
                        </select>
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Dashboard;
