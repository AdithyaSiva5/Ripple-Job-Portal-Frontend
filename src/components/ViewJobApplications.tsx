
import { updateApplicationStatus, viewJob } from '../services/api/user/apiMethods';
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import ViewApplication from './ViewApplication';
import { useSelector } from 'react-redux';
import { View } from 'lucide-react';
import InterviewForm from './InterviewForm';
const ViewJobApplications = () => {

    const selectUser = (state: any) => state.auth.user || "";
    const user = useSelector(selectUser) || "";
    const userId = user._id || "";

    const { jobId } = useParams();
    const location = useLocation()
    const { pathname } = location;




    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const [selectedApplication, setSelectedApplication] = useState<any>({});
    const [isViewApplication, setIsViewAppliaction] = useState<boolean>(false);
    const [isInterview, setIsInterview] = useState<boolean>(false);

    const handleViewApplication = (application: any) => {
        setIsViewAppliaction(true);
        setSelectedApplication(application);
    };

    const handlescheduleInterview = (application: any) => {
        setIsInterview(true);
        setSelectedApplication(application);
    };
    const cancelViewApplication = () => {
        setIsViewAppliaction(false)
    }

    const cancelscheduleInterview = () => {
        setIsInterview(false)
    }

    const handleApplictionStatus = (applicationId: string, status: string, userId: string) => {
        updateApplicationStatus({ applicationId, status, userId }).then((response: any) => {
            const applicationsData = response.data.jobSpecificApplications


            switch (pathname) {
                case `/jobs/view-job/applications/pending/${jobId}`:
                    setApplications(applicationsData.filter((app: any) => app.applicationStatus === 'Pending'));
                    break;
                case `/jobs/view-job/applications/accepted/${jobId}`:
                    setApplications(applicationsData.filter((app: any) => app.applicationStatus === 'Accepted'));
                    break;
                case `/jobs/view-job/applications/rejected/${jobId}`:
                    setApplications(applicationsData.filter((app: any) => app.applicationStatus === 'Rejected'));
                    break;
                default:
                    setApplications(applicationsData);
                    break;
            }
            toast.success(response.data.message)
        })
            .catch((error) => {
                console.log(error.message);
            });

    }


    useEffect(() => {
        const { pathname } = location;


        setLoading(true);
        viewJob({ jobId: jobId })
            .then((response: any) => {

                const applicationsData = response.data.applications


                switch (pathname) {
                    case `/jobs/view-job/applications/pending/${jobId}`:
                        setApplications(applicationsData.filter((app: any) => app.applicationStatus === 'Pending'));
                        break;
                    case `/jobs/view-job/applications/accepted/${jobId}`:
                        setApplications(applicationsData.filter((app: any) => app.applicationStatus === 'Accepted'));
                        break;
                    case `/jobs/view-job/applications/rejected/${jobId}`:
                        setApplications(applicationsData.filter((app: any) => app.applicationStatus === 'Rejected'));
                        break;
                    default:
                        setApplications(applicationsData);
                        break;
                }

            })
            .catch((error: any) => {
                toast.error(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [location]);







    return (

        <div>



            {!loading && applications && applications.map((application) => (
                <div key={application._id} className="home-post-section bg-white p-5 " style={{ height: "180px" }}>
                    <div className="w-full flex justify-between ">
                        <div className="flex">
                            <img className="w-14 h-14 rounded-md border-2 p-.5 mb-3 border-green-600" src={application.applicantId.profileImageUrl} alt="" />
                            <div className="mx-5">

                                <p className="text-sm font-bold"> {application?.applicantId?.profile?.fullname ? application?.applicantId?.profile?.fullname : application?.applicantId?.companyProfile?.companyName}</p>
                                <p className="text-xs">{application?.applicantId?.profile?.designation ? application?.applicantId?.profile?.designation : application?.applicantId?.companyProfile?.companyType}</p>

                            </div>
                        </div>
                        <div className="flex text-xs gap-1">

                            <p className="font-semibold">Status :</p>
                            {application.applicationStatus === 'Rejected' && (
                                <p className="text-red-600">{application.applicationStatus}</p>

                            )}
                            {application.applicationStatus === 'Pending' && (
                                <p className="text-gray-500">{application.applicationStatus}</p>

                            )}
                            {application.applicationStatus === 'Accepted' && (
                                <p className="text-green-600">{application.applicationStatus}</p>

                            )}

                        </div>

                    </div>

                    <div className="flex items-end justify-between">

                        <div className="flex flex-col  items-start">
                            <div className="flex gap-2" >
                                <p className="text-xs font-semibold">Applying for the position of :</p>
                                <p className="text-xs">{application.jobId.jobRole}</p>
                            </div>
                            <div className="flex gap-2">
                                <p className="text-xs font-semibold">Job location :</p>
                                <p className="text-xs">{application.jobId.jobLocation}</p>
                            </div>
                            <div className="flex gap-2">
                                <p className="text-xs font-semibold">Job Type :</p>
                                <p className="text-xs">{application.jobId.jobType}</p>
                            </div>
                        </div>

                        <div className=" flex justify-end mt-10">

                        </div>


                        <div className=" flex justify-end mt-10">
                            <button
                                onClick={() => handleViewApplication(application)}
                                className="text-xs rounded btn border px-4 py-2 cursor-pointer bg-white ml-2 text-green-600"
                            >
                                <View size={18} />
                            </button>

                            {application.applicationStatus === 'Rejected' && (
                                <button
                                    onClick={() => handleApplictionStatus(application._id, "Accepted", userId)}
                                    className="text-xs rounded btn border px-4 py-2 cursor-pointer bg-white ml-2 text-green-600"
                                >
                                    Accept Application
                                </button>

                            )}
                            {application.applicationStatus === 'Pending' && (
                                <div>

                                    <button
                                        onClick={() => handleApplictionStatus(application._id, "Accepted", userId)}
                                        className="text-xs rounded btn border px-4 py-2 cursor-pointer bg-white ml-2 text-green-600"
                                    >
                                        Accept Application
                                    </button>
                                    <button
                                        onClick={() => handleApplictionStatus(application._id, "Rejected", userId)}

                                        className="text-xs rounded btn border px-4 py-2 cursor-pointer text-red-600 ml-2 bg-white"
                                    >
                                        Reject Application
                                    </button>
                                </div>


                            )}
                            {application.applicationStatus === 'Accepted' && application?.isInterviewScheduled == false && (

                                <div>
                                    <button
                                        onClick={() => handlescheduleInterview(application)}
                                        className="text-xs rounded btn border px-5 py-2 cursor-pointer bg-green-600 ml-2 text-white"
                                    >
                                        Schedule Interview
                                    </button>

                                    <button
                                        onClick={() => handleApplictionStatus(application._id, "Rejected", userId)}

                                        className="text-xs rounded btn border px-4 py-2 cursor-pointer text-red-600 ml-2 bg-white"
                                    >
                                        Reject Application
                                    </button>
                                </div>




                            )}
                            {application.applicationStatus === 'Accepted' && application?.isInterviewScheduled == true && (

                                <div>
                                    <button

                                        className="text-xs cursor-auto rounded btn border border-green-600  px-4 py-2  bg-white ml-2 text-green-600"
                                    >
                                        Interview Scheduled
                                    </button>


                                </div>




                            )}

                        </div>
                    </div>
                    {isViewApplication && selectedApplication._id === application._id && (
                        <ViewApplication application={selectedApplication} cancelViewApplication={cancelViewApplication} />
                    )}
                    {isInterview && selectedApplication._id === application._id && (
                        <InterviewForm application={selectedApplication} cancelscheduleInterview={cancelscheduleInterview} setApplications={setApplications} />
                    )}
                </div>
            ))}

        </div>

    );
};

export default ViewJobApplications;
