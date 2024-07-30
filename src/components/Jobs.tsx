import { useEffect, useState } from "react";
import { Bookmark, Lock } from "lucide-react";
import { listJob, savePost } from "../services/api/user/apiMethods";
import { useDispatch, useSelector } from "react-redux";
import ApplyJobForm from "./ApplyJobForm";
import { debounce } from "lodash";
import { useFilterContext } from "../utils/context/jobfilterData/FilterContext";
import { updateUser } from "../utils/context/reducers/authSlice";
import { toast } from "sonner";

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

const Jobs = () => {
  const dispatch = useDispatch();
  const { filterData } = useFilterContext();
  const selectUser = (state: any) => state.auth.user || "";
  const user = useSelector(selectUser) || "";
  const userId = user._id || "";

  const [jobs, setJobs] = useState<jobProps["post"][]>([]);
  const [selectedjob, setSelectedJob] = useState<any>({});
  const [isApply, setIsApply] = useState<boolean>(false);
  console.log(user)

  const handleApplyJob = (job: any) => {
    setIsApply(true);
    setSelectedJob(job);
  };
  const cancelApplyJob = () => {
    setIsApply(false)
  }


  const debouncedListJob = debounce((filterData, userId) => {
    listJob({ filterData, userId })
      .then((response: any) => {
        const jobsData = response.data.jobs;
        setJobs(jobsData);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, 600);

  useEffect(() => {
    debouncedListJob(filterData, userId);
    return () => {

      debouncedListJob.cancel();
    };
  }, [filterData]);

  useEffect(() => {
    try {
      listJob({})
        .then((response: any) => {
          const jobsData = response.data.jobs;
          const activeJobs = jobsData.filter((job: any) => !job.isAdminBlocked);
          setJobs(activeJobs);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  const handleSave = (jobId: string, userId: string) => {
    try {
      savePost({ postId: null, userId, jobId })
        .then((response: any) => {
          const userData = response.data;

          dispatch(updateUser({ user: userData }));

        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error: any) {
      console.log(error.message);
    }
  };
  console.log(user)
  return (
    <>
      {jobs.map((job) => (
        <div key={job._id} className="home-post-section bg-secondary border border-green p-4 py-10" style={{ height: "520px" }}>
          <div className="w-full flex justify-between items-center">
            <div className="flex">
              <img className="w-14 h-14 rounded-md border border-green" src={job.userId.profileImageUrl} alt="" />
              <div className="mx-5">
                <p className="text-sm text-white">{job.companyName}</p>
                <p className="text-sm font-bold text-white" >{job.jobRole}</p>
              </div>
            </div>

            <div className="flex ">
              {user.savedJobs?.includes(job._id) ? (
                <button onClick={() => handleSave(job._id, user._id)} type="button">
                  <Bookmark color="green" fill="green" strokeWidth={1.5} size={22} />
                </button>
              ) : (
                <button onClick={() => handleSave(job._id, user._id)} type="button">
                  <Bookmark color="gray" strokeWidth={1.5} size={22} />
                </button>
              )}

            </div>
          </div>
          <div className="mt-10">
            <p className="text-sm mb-3 font-bold dark:text-white">Job Overview</p>
            <p className="text-xs dark:text-white">{job.jobDescription}</p>
          </div>
          <div className="mt-10">
            <p className="text-sm mb-3 font-bold dark:text-white">Skills Required</p>
            <div className="flex">
              <p className="text-xs dark:text-white">{job.requiredSkills}</p>
            </div>
          </div>
          <div className="mt-10">
            <p className="text-sm mb-3 font-bold dark:text-white">Job Details</p>
            <div className="flex w-full justify-between">
              <div>
                <p className="text-xs font-semibold dark:text-white">Location</p>
                <p className="text-xs dark:text-white">{job.jobLocation}</p>
              </div>
              <div>
                <p className="text-xs font-semibold dark:text-white">Salary</p>
                <p className="text-xs dark:text-white">{job.salary}</p>
              </div>
              <div>
                <p className="text-xs font-semibold dark:text-white">Job Type</p>
                <p className="text-xs dark:text-white">{job.jobType}</p>
              </div>
              <div>
                <p className="text-xs font-semibold dark:text-white">Experience</p>
                <p className="text-xs dark:text-white">{job.experience} years</p>
              </div>
              <div>
                <p className="text-xs font-semibold dark:text-white">Qualifications</p>
                <p className="text-xs dark:text-white">{job.qualification}</p>
              </div>
            </div>
          </div>
          {(user.dailyJobsApplied ?? 0) < 3 || user.isPremium ? (
            <div className="w-full flex justify-end mt-10">
              <button
                onClick={() => handleApplyJob(job)}
                className="text-xs rounded btn border w-24 px-4 py-2 cursor-pointer text-white ml-2 bg-green-600"
              >
                Apply {3 - (user.dailyJobsApplied ?? 0)} left
              </button>
            </div>
          ) : (
            <div className="w-full flex justify-end mt-10">
              <button
                className="text-xs rounded btn border w-24 px-4 py-1 cursor-pointer text-white ml-2 bg-red-600 flex"
              >
                Need Premium <Lock className="flex" />
              </button>
            </div>
          )}

          {isApply && selectedjob._id === job._id && <ApplyJobForm job={selectedjob} cancelApplyJob={cancelApplyJob} />}
        </div>
      ))}
    </>
  );
};

export default Jobs;