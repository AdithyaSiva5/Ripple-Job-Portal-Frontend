import { useEffect } from "react";
import { Outlet, useNavigate, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ChevronLeft } from "lucide-react";

function JobsDetails() {
  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const location = useLocation();
  const { jobId } = useParams();
  useEffect(() => {
    if (user.isHiring === false) {
      navigate("jobs/open-to-work/job-list");
    }
  }, [user, navigate]);

  return (
    <div>
      <div className="people-section-2">
        <div className="flex w-full">
          <div className="border w-full profile-nav flex items-center justify-center gap-20 bg-white rounded-md mx-5">
            <button
              onClick={() => {
                navigate(`/jobs/view-job/job-info/${jobId}`);
              }}
              className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-7 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 ${
                location.pathname === `/jobs/view-job/job-info/${jobId}`
                  ? "bg-black text-white"
                  : ""
              }`}
              type="submit"
            >
              Job Info
            </button>
            <button
              onClick={() => {
                navigate(`/jobs/view-job/applications/pending/${jobId}`);
              }}
              className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-7 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 ${
                location.pathname ===
                `/jobs/view-job/applications/pending/${jobId}`
                  ? "bg-black text-white"
                  : ""
              }`}
              type="submit"
            >
              Applications
            </button>
            <button
              onClick={() => {
                navigate(`/jobs/view-job/applications/accepted/${jobId}`);
              }}
              className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-7 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 ${
                location.pathname ===
                `/jobs/view-job/applications/accepted/${jobId}`
                  ? "bg-black text-white"
                  : ""
              }`}
              type="submit"
            >
              Accepted
            </button>
            <button
              onClick={() => {
                navigate(`/jobs/view-job/applications/rejected/${jobId}`);
              }}
              className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-7 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 ${
                location.pathname ===
                `/jobs/view-job/applications/rejected/${jobId}`
                  ? "bg-black text-white"
                  : ""
              }`}
              type="submit"
            >
              Rejected
            </button>
            <button
              onClick={() => {
                navigate(`/jobs/view-job/interviews/${jobId}`);
              }}
              className={`text-xs font-medium text-gray-400 c hover:text-white focus:bg-black focus:text-white px-7 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 ${
                location.pathname === `/jobs/view-job/interviews/${jobId}`
                  ? "bg-black text-white"
                  : ""
              }`}
              type="submit"
            >
              Interviews
            </button>
          </div>

          <div
            onClick={() => {
              navigate("/jobs/hiring/job-list");
            }}
            className=" border cursor-pointer text-xs text-gray-400 w-32 profile-nav flex items-center justify-center  bg-white rounded-md "
          >
            {" "}
            <ChevronLeft size={18} /> Go back
          </div>
        </div>

        <div className="home-scroll">
          <div className="home-scrollbox">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobsDetails;
