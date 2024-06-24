import React, { useEffect, useState } from "react";
import {
  Edit,

  ShieldAlert,
  ShieldCheck,
  View,
} from "lucide-react";

import {  listUserJob } from "../services/api/user/apiMethods";
import "../pages/admin/userlistPage/userList.css";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
const HiringJobList: React.FC = () => {
  const selectUser = (state: any) => state.auth.user || "";
  const user = useSelector(selectUser) || "";
  const userId = user._id || "";
  const navigate =useNavigate()

  const [jobs, setJobs] = useState<any>([]);

  useEffect(() => {
    try {
     listUserJob({userId:userId})
        .then((response: any) => {
          const jobsData = response.data.jobs;
          setJobs(jobsData);

          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log(jobs);

  return (
<>
{jobs.length === 0 ?(
<div className="text-gray-600 text-xs border-dashed border opacity-75 bg-white border-gray-400 flex justify-center p-60 rounded-lg ms-5 mt-9">
<p className="py-2">No Job postings</p>

</div>


):(

  <div className="w-full overflow-hidden rounded-lg m-5" style={{width:'1053px'}}>
  <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
    <thead className="bg-gray-50">
      <tr>
        <th
          scope="col"
          className="text-xs  px-6 py-4  text-gray-900"
        >
          Job Role
        </th>
        <th
          scope="col"
          className="text-xs px-6 py-4 font-medium text-gray-900"
        >
          Job Type
        </th>
        <th
          scope="col"
          className="text-xs px-6 py-4 font-medium text-gray-900"
        >
          Posted on
        </th>
        <th
          scope="col"
          className="text-xs px-6 py-4 font-medium text-gray-900"
        >
          Last Date
        </th>
        <th
          scope="col"
          className="text-xs px-6 py-4 font-medium text-gray-900"
        >
          Status
        </th>
        <th
          scope="col"
          className="text-xs px-6 py-4 font-medium flex justify-center text-gray-900"
        >
          Action
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
      {jobs?.map((job: any) => (
        <tr key={job._id} className="hover:bg-gray-50">
          <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
            <div className="relative h-10 w-10">
              <img
                className="h-full w-full rounded-full object-cover object-center"
                src={job.userId.profileImageUrl}
                alt=""
              />
            </div>
            <div className="text-xs">
              <div className="font-medium text-gray-700">
                {job.companyName}
              </div>
              <div className="text-gray-400">{job.jobRole}</div>
            </div>
          </th>
          <td className="px-6 py-4">
            <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold text-green-600">
              <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
              {job.jobType}
            </span>
          </td >
          <td className="font-xs px-6 py-4">{new Date(job.createdAt).toLocaleDateString()}</td>
          <td className=" font-xs px-6 py-4">{new Date(job.lastDateToApply).toLocaleDateString()}</td>
          <td className="text-xs px-6 py-4">
            {job.isDeleted ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                Blocked
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                UnBlocked
              </span>
            )}
          </td >
          <td className=" flex text-xs py-4">
            <button
            
              type="button"
              onClick={() => (job._id, "block")}
              className="text-xs px-5 bg-white text-green-600 hover:bg-gray-100 border border-gray-200 focus:outline-none font-medium rounded-lg py-2.5 text-center inline-flex items-center me-2 mb-2"
            >
              <View size={18} /> View
            </button>

            <button
        
              type="button"
              onClick={()=>{navigate(`/jobs/hiring/edit-job/${job._id}`)}}
              className="text-xs px-5 bg-white text-gray-600 hover:bg-gray-100 border border-gray-200  focus:outline-none  font-medium rounded-lg  py-2.5 text-center inline-flex items-center  me-2 mb-2"
            >
              <Edit size={18} /> Edit
            </button>

            <div className=" justify-end gap-4">
              {job.isDeleted ? (
                <button
                  type="button"
               
                  onClick={() => (job._id, "unblock")}
                  className="text-xs  px-5 bg-white text-green-600 hover:bg-gray-100 border border-gray-200  focus:outline-none font-medium rounded-lg  py-2.5 text-center inline-flex items-center me-2 mb-2"
                >
                  <ShieldCheck size={18} />
                  UnBlock
                </button>
              ) : (
                <button
               
                  type="button"
                  onClick={() => (job._id, "block")}
                  className="text-xs px-5  bg-white text-red-600 hover:bg-gray-100 border border-gray-200  focus:outline-none  font-medium rounded-lg  py-2.5 text-center inline-flex items-center  me-2 mb-2"
                >
                  <ShieldAlert size={18} /> Block
                </button>
              )}
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>




)}
  
  </>
  );
  
};

export default HiringJobList;
