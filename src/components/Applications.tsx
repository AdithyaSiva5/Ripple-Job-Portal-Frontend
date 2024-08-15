
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { cancelJobApplication, getemployeeApplications } from "../services/api/user/apiMethods";
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

const Applications = () => {
  const selectUser = (state: any) => state.auth.user || "";
  const user = useSelector(selectUser) || "";
  const userId = user._id || "";

  const [applications, setApplications] = useState<any[]>([]);
  const [selectedjob, setSelectedJob] = useState<any>({});
  const [isApply, setIsApply] = useState<boolean>(false);



  useEffect(() => {
    try {
      getemployeeApplications({ applicantId: userId })
        .then((response: any) => {
          const applicationsData = response.data.applications;
          setApplications(applicationsData);
          updateUser(response.data)
        })
        .catch((error) => {
          console.log(error.message);
          setApplications([]);
        });
    } catch (error) {
      console.log(error);
      setApplications([]);
    }
  }, []);

  const handleCancelApplication = (applicationId: string) => {
    cancelJobApplication({ applicationId: applicationId, applicantId: userId }).then((response: any) => {
      const applicationsData = response.data.applications;
      setApplications(applicationsData);
      toast.error(response.data.message)

    })
  };
  if (!applications || applications.length === 0) {
    return <div className='text-red-600 mt-10'>No applications found</div>;
  }

  return (
    <>
      {applications?.map((application) => (
        <div key={application._id} className="home-post-section bg-secondary dark:border dark:border-green p-4 " style={{ height: "165px" }}>
          <div className="w-full flex justify-between ">
            <div className="flex">
              <div className="w-14 h-14 rounded-md bg-green-600 flex items-center justify-center font-bold text-white text-2xl dark:text-white">
                {application.jobId?.jobRole?.slice(0, 1)}
              </div>               <div className="mx-5">
                <p className="text-sm dark:text-white">{application.jobId?.companyName}</p>
                <p className="text-sm font-bold dark:text-white">{application.jobId?.jobRole}</p>
              </div>
            </div>
            <div className="flex text-xs gap-1">

              <p className="font-semibold dark:text-white">Status :</p>
              {application.applicationStatus === 'Rejected' && (
                <p className="text-red-600 dark:text-white">{application.applicationStatus}</p>

              )}
              {application.applicationStatus === 'Pending' && (
                <p className="text-gray-500 dark:text-white">{application.applicationStatus}</p>

              )}
              {application.applicationStatus === 'Accepted' && (
                <p className="text-green-600 dark:text-white">{application.applicationStatus}</p>

              )}




            </div>

          </div>

          <div className="flex items-end justify-between">
            <div className="flex flex-col  items-start">
              <div className="flex gap-2" >
                <p className="text-xs font-semibold dark:text-white">Location :</p>
                <p className="text-xs dark:text-white">{application.jobId?.jobLocation}</p>
              </div>
              <div className="flex gap-2">
                <p className="text-xs font-semibold dark:text-white">Salary :</p>
                <p className="text-xs dark:text-white">{application.jobId?.salary}</p>
              </div>
              <div className="flex gap-2">
                <p className="text-xs font-semibold dark:text-white">Job Type :</p>
                <p className="text-xs dark:text-white">{application.jobId?.jobRole}</p>
              </div>
            </div>

            <div className=" flex justify-end mt-10">

              {/* {application.applicationStatus == "Pending" && (
                <button
                  onClick={() => { handleCancelApplication(application._id) }}
                  className="text-xs rounded btn border px-4 py-2 cursor-pointer text-red-600 ml-2 bg-white"
                >
                  Cancel Application
                </button>

              )} */}
              {/* {application.applicationStatus !== "Pending" && (
                <button

                  className="text-xs rounded btn border px-4 py-2 cursor-pointer text-green-600 ml-2 bg-white"
                >
                  View Application
                </button>

              )} */}

            </div>
          </div>








        </div>
      ))}
    </>
  );
};

export default Applications;