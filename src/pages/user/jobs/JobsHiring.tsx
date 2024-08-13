import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFilterContext } from "../../../utils/context/jobfilterData/FilterContext";
import { darkMode } from "../../../utils/context/reducers/darkmodeSlice";

function JobsHiring() {
  const dark = useSelector(darkMode);

  useEffect(() => {
    if (!dark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [dark]);

  const selectUser = (state: any) => state.auth.user;
  const { filterData, setFilterData } = useFilterContext();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    if (user.isHiring === false) {
      navigate("jobs/open-to-work/job-list");
    }
  }, [user, navigate]);
  useEffect(() => {
    setFilterData({
      search: searchText,
      jobRole: null,
      location: null,
      jobType: null,
      salaryRange: null,
      experienceRange: null,
    });
  }, [searchText, setFilterData]);

  // const handleInputChange = (e: any) => {
  //   setSearchText(e.target.value);
  // };

  return (
    <div className="tho">
      <div className="people-section-2">
        <div className="flex w-full">
            <div className="border profile-nav flex items-center justify-center gap-20 bg-secondary dark:border dark:border-green rounded-md mx-5 flex-grow">
            <button
              onClick={() => {
                navigate("/jobs/hiring/job-list");
              }}
              className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-7 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 ${
                location.pathname === "/jobs/hiring/job-list"
                  ? "bg-black text-white"
                  : ""
              }`}
              type="submit"
            >
              Job Postings
            </button>
            <button
              onClick={() => {
                navigate("/jobs/hiring/applicants");
              }}
              className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-7 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 ${
                location.pathname === "/jobs/hiring/applicants"
                  ? "bg-black text-white"
                  : ""
              }`}
              type="submit"
            >
              Applicants
            </button>
            {/* <button
              onClick={() => {
                navigate("/jobs/hiring/interviews");
              }}
              className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-7 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 ${
                location.pathname === "/jobs/hiring/interviews"
                  ? "bg-black text-white"
                  : ""
              }`}
              type="submit"
            >
              Interviews
            </button> */}
          </div>
          <button
            onClick={() => navigate("/jobs/hiring/add-job")}
            className={`text-xs w-28 font-medium text-green-600 dark:border dark:border-green hover:text-white focus:bg-black focus:text-white px-7 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 ${
              location.pathname === "/jobs/hiring/add-job"
                ? "bg-black text-white"
                : " bg-secondary"
            }`}
            type="submit"
          >
            Add Job
          </button>
          {/* <div className="border w-1/3 profile-nav flex items-center justify-center gap-20 bg-white rounded-md ms-4">
            <div className="flex items-center justify-start g-2 w-full p-2">
              <p className="text-xs text-gray-500 w-1/3 ps-5">Search Job</p>
              <input
                type="text"
                className="searchInput w-3/4 text-xs text-gray-400 p-2 border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                value={searchText}
                onChange={handleInputChange}
              />
            </div>
          </div> */}
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
export default JobsHiring;
