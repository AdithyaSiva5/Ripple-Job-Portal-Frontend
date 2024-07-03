import  { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import {  listUserJob } from "../services/api/user/apiMethods";
import { useDispatch, useSelector } from "react-redux";
import ApplyJobForm from "./ApplyJobForm";
import { updateUser } from "../utils/context/reducers/authSlice";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

interface jobProps {
  post: {
    _id: string;
    userId: {
      _id: string;
      profileImageUrl: string;
    };
    companyName: string;
    jobRole: string;
    jobDescription: string;
    requiredSkills: string;
    jobLocation: string;
    salary: string;
    jobType: string;
    experience: string;
    qualification: string;
  };
}

const ViewerJobs= () => {
  const selectUser = (state: any) => state.auth.user || "";
  const user = useSelector(selectUser) || "";
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [jobs, setJobs] = useState<jobProps["post"][]>([]);
  const [selectedjob, setSelectedJob] = useState<any>({});
  const [isApply, setIsApply] = useState<boolean>(false);


  const handleApplyJob = (job:any) => {
    setIsApply(true);
    setSelectedJob(job);
  };
  const cancelApplyJob=()=>{
    setIsApply(false)
  }


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

 


  return (
    <>
      {jobs.map((job) => (
        <div key={job._id} className="home-post-section bg-white p-4 py-10" style={{ height: "520px" }}>
          <div className="w-full flex justify-between items-center">
            <div className="flex">
            <div className="w-14 h-14 rounded-md bg-green-600 flex items-center justify-center font-bold text-white text-2xl">
                {job.jobRole.slice(0,1)}
                </div>              <div className="mx-5">
                <p className="text-sm">{job.companyName}</p>
                <p className="text-sm font-bold">{job.jobRole}</p>
              </div>
            </div>

            <div className="flex ">
            

             </div>
          </div>
          <div className="mt-10">
            <p className="text-sm mb-3 font-bold">Job Overview</p>
            <p className="text-xs">{job.jobDescription}</p>
          </div>
          <div className="mt-10">
            <p className="text-sm mb-3 font-bold">Skills Required</p>
            <div className="flex">
              <p className="text-xs">{job.requiredSkills}</p>
            </div>
          </div>
          <div className="mt-10">
            <p className="text-sm mb-3 font-bold">Job Details</p>
            <div className="flex w-full justify-between">
              <div>
                <p className="text-xs font-semibold">Location</p>
                <p className="text-xs">{job.jobLocation}</p>
              </div>
              <div>
                <p className="text-xs font-semibold">Salary</p>
                <p className="text-xs">{job.salary}</p>
              </div>
              <div>
                <p className="text-xs font-semibold">Job Type</p>
                <p className="text-xs">{job.jobType}</p>
              </div>
              <div>
                <p className="text-xs font-semibold">Experience</p>
                <p className="text-xs">{job.experience} years</p>
              </div>
              <div>
                <p className="text-xs font-semibold">Qualifications</p>
                <p className="text-xs">{job.qualification}</p>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-end mt-10">
            <button
              onClick={() => handleApplyJob(job)}
              className="  hover:bg-white hover:border duration-300 hover:text-green-600 text-xs rounded btn border w-24 px-4 py-2 cursor-pointer text-white ml-2 bg-green-600"
            >
              Apply
            </button>
          </div>

          {isApply && selectedjob._id === job._id && <ApplyJobForm job={selectedjob} cancelApplyJob={cancelApplyJob} />}
        </div>
      ))}
    </>
  );
};

export default ViewerJobs;