import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getInterviewerInterviews, setInterviewStatus } from "../services/api/user/apiMethods";
import CopyLink from "./CopyLink";
import { View } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";

const ViewJobInterviews = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleGroupVideoCall = (interviewLink: string, interviewId: string) => {
        setInterviewStatus({ interviewId: interviewId, status: "Started" });
        const roomId = interviewLink;
        navigate(`/interview-call/${roomId}/${user._id}`, { state: { from: location.pathname } });
    };

    const selectUser = (state: any) => state.auth.user || "";
    const user = useSelector(selectUser) || "";
    const userId = user._id || "";

    const [interviews, setInterviews] = useState<any[]>([]);

    const handleStatusChange = (interviewId: string, selectedOption: any) => {
        setInterviewStatus({ interviewId: interviewId, status: selectedOption.value });
    };
  
    useEffect(() => {
        try {
            getInterviewerInterviews({ interviewerId: userId })
                .then((response: any) => {
                    const interviewsData = response.data.interviews;
                    console.log(interviewsData)
                    setInterviews(interviewsData);
                })
                .catch((error) => {
                    console.log(error.message);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <>
            {interviews?.map((interview) => (
                <div key={interview._id} className="home-post-section bg-white p-4">
                    <div className="flex w-full justify-between">
                        <div>
                            <div className="w-full flex justify-between">
                                <div className="flex">
                                    <div className="w-14 h-14 rounded-md bg-green-600 flex items-center justify-center font-bold text-white text-2xl">
                                        {interview?.jobId?.jobRole?.slice(0, 1)}
                                    </div>
                                    <div className="mx-5">
                                        <p className="text-sm">{interview.jobId.companyName}</p>
                                        <p className="text-sm font-bold">{interview.jobId.jobRole}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex flex-col items-start mt-4">
                                    <div>
                                        <div className="flex text-xs gap-1">
                                            <p className="font-semibold">Interview Date :</p>
                                            <p className="text-xs">{formatDate(interview.interviewDate)}</p>
                                        </div>
                                        <div className="flex text-xs gap-1">
                                            <p className="font-semibold">Interview Time :</p>
                                            <p className="text-xs">{interview.interviewTime}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="select">
                            <Select className="text-xs"
                                options={[
                                    { value: "Pending", label: "Pending" },
                                    { value: "Started", label: "Started" },
                                    { value: "Completed", label: "Completed" },
                                    { value: "Cancelled", label: "Cancelled" }
                                ]}
                                onChange={(selectedOption) => handleStatusChange(interview._id, selectedOption)}
                                defaultValue={{ value: interview.status, label: interview.status }}
                            />
                        </div>
                    </div>

                    <div className="flex items-end justify-between">
                        <CopyLink interview={interview} />
                        <div className="flex justify-end mt-4">
                            <button
                                className="text-xs rounded btn border px-4 py-2 cursor-pointer text-green-600 ml-2 bg-white"
                            >
                                <View size={15} />
                            </button>
                            <button
                                onClick={() => { handleGroupVideoCall(interview.interviewLink, interview._id) }}
                                className="text-xs rounded btn border px-4 py-2 cursor-pointer text-green-600 ml-2 bg-white"
                            >
                                Join Interview
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ViewJobInterviews;
