import React, { useEffect, useState } from "react";
import { View } from "lucide-react";
import { getemployerApplications, updateApplicationStatus } from "../services/api/user/apiMethods";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import ViewApplication from "./ViewApplication";

interface Application {
  _id: string;
  applicantId: {
    profileImageUrl: string;
    profile?: {
      fullname: string;
      designation: string;
    };
    companyProfile?: {
      companyName: string;
      companyType: string;
    };
  };
  jobId: {
    jobRole: string;
    jobLocation: string;
    jobType: string;
  };
  applicationStatus: 'Rejected' | 'Pending' | 'Accepted';
}

const HiringApplications: React.FC = () => {
  const selectUser = (state: any) => state.auth.user || "";
  const user = useSelector(selectUser);
  const userId = user?._id || "";

  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isViewApplication, setIsViewApplication] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleViewApplication = (application: Application) => {
    setIsViewApplication(true);
    setSelectedApplication(application);
  };

  const cancelViewApplication = () => {
    setIsViewApplication(false);
    setSelectedApplication(null);
  };

  const handleApplicationStatus = (applicationId: string, status: string) => {
    updateApplicationStatus({ applicationId, status, userId })
      .then((response: any) => {
        const updatedApplications = applications.map(app => 
          app._id === applicationId ? { ...app, applicationStatus: status } : app
        );
        setApplications(updatedApplications);
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.error("Error updating application status:", error);
        toast.error("Failed to update application status");
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getemployerApplications({ userId })
      .then((response: any) => {
        const applicationsData = response.data.applications;
        setApplications(applicationsData);
      })
      .catch((error) => {
        console.error("Error fetching applications:", error);
        toast.error("Failed to fetch applications");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (applications.length === 0) {
    return <div>No applications found.</div>;
  }

  return (
    <>
      {applications.map((application) => (
        <div key={application._id} className="home-post-section bg-white p-4" style={{ height: "180px" }}>
          <div className="w-full flex justify-between">
            <div className="flex">
              <img className="w-14 h-14 rounded-md border-2 p-.5 mb-3 border-green-600" src={application.applicantId.profileImageUrl} alt="" />
              <div className="mx-5">
                <p className="text-sm font-bold">
                  {application.applicantId.profile?.fullname || application.applicantId.companyProfile?.companyName}
                </p>
                <p className="text-xs">
                  {application.applicantId.profile?.designation || application.applicantId.companyProfile?.companyType}
                </p>
              </div>
            </div>
            <div className="flex text-xs gap-1">
              <p className="font-semibold">Status:</p>
              <p className={`${
                application.applicationStatus === 'Rejected' ? 'text-red-600' :
                application.applicationStatus === 'Pending' ? 'text-gray-500' :
                'text-green-600'
              }`}>
                {application.applicationStatus}
              </p>
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div className="flex flex-col items-start">
              <div className="flex gap-2">
                <p className="text-xs font-semibold">Applying for the position of:</p>
                <p className="text-xs">{application.jobId.jobRole}</p>
              </div>
              <div className="flex gap-2">
                <p className="text-xs font-semibold">Job location:</p>
                <p className="text-xs">{application.jobId.jobLocation}</p>
              </div>
              <div className="flex gap-2">
                <p className="text-xs font-semibold">Job Type:</p>
                <p className="text-xs">{application.jobId.jobType}</p>
              </div>
            </div>

            <div className="flex justify-end mt-10">
              <button
                onClick={() => handleViewApplication(application)}
                className="text-xs rounded btn border px-4 py-2 cursor-pointer bg-white ml-2 text-green-600"
              >
                <View size={18} />
              </button>

              {application.applicationStatus === 'Rejected' && (
                <button
                  onClick={() => handleApplicationStatus(application._id, "Accepted")}
                  className="text-xs rounded btn border px-4 py-2 cursor-pointer bg-white ml-2 text-green-600"
                >
                  Accept Application
                </button>
              )}

              {application.applicationStatus === 'Pending' && (
                <>
                  <button
                    onClick={() => handleApplicationStatus(application._id, "Accepted")}
                    className="text-xs rounded btn border px-4 py-2 cursor-pointer bg-white ml-2 text-green-600"
                  >
                    Accept Application
                  </button>
                  <button
                    onClick={() => handleApplicationStatus(application._id, "Rejected")}
                    className="text-xs rounded btn border px-4 py-2 cursor-pointer text-red-600 ml-2 bg-white"
                  >
                    Reject Application
                  </button>
                </>
              )}

              {application.applicationStatus === 'Accepted' && (
                <button
                  onClick={() => handleApplicationStatus(application._id, "Rejected")}
                  className="text-xs rounded btn border px-4 py-2 cursor-pointer text-red-600 ml-2 bg-white"
                >
                  Reject Application
                </button>
              )}
            </div>
          </div>

          {isViewApplication && selectedApplication?._id === application._id && (
            <ViewApplication application={selectedApplication} cancelViewApplication={cancelViewApplication} />
          )}
        </div>
      ))}
    </>
  );
};

export default HiringApplications;