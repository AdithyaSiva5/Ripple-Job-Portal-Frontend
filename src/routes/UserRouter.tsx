import { createBrowserRouter } from "react-router-dom";
import Signup from "../pages/user/signupPage/Signup";
import Login from "../pages/user/loginPage/Loginpage";
import OtpPage from "../pages/user/otpPage/OtpPage";
import ForgotPassword from "../pages/user/forgotPasswordPage/ForgotPassword";
import RegisterSucces from "../pages/user/registerSuccess/RegisterSuccess";
import ChangePassword from "../pages/user/changePassword/ChangePassword";
import Landing from "../pages/user/landingPage/Landing";
import UserHome from "../pages/user/userHome/UserHome";
import PasswordOtp from "../pages/user/passwordOtpPage/PasswordOtp";
import App from "../App";
import { adminLoginRouter, adminRouter } from "./AdminRouter";
import Profile from "../pages/user/profilePage/Profile";
import UserBio from "../components/UserBio";
import UserPost from "../components/UserPost";
import Settings from "../components/Settings";
import JobsHiring from "../pages/user/jobs/JobsHiring";
import JobsOpenToWork from "../pages/user/jobs/JobsOpenToWork";
import HiringJobList from "../components/HiringJobList";
import HiringApplications from "../components/HiringApplicants";
import HiringInterviews from "../components/HiringInterviews";
import ViewJob from "../components/ViewJob";
import AddJob from "../components/AddJob";
import EditJob from "../components/EditJob";
import Jobs from "../components/Jobs";
import Applications from "../components/Applications";
import Interviews from "../components/Interviews";

createBrowserRouter


const appRouter = createBrowserRouter([
    {
        path:"/",
        element:<Landing/>
    },
    {
      path: "/home",
      element: <App />,
      children: [
        {
          path: "/home",
          element: <UserHome />,
        },
      ],
    },
    {
      path:"/jobs",
      element:<App/>,
      children:[
        {
          path:"/jobs/hiring",
          element:<JobsHiring/>,
          children:[
            {
              path:"/jobs/hiring/job-list",
              element:<HiringJobList/>
            },
            {
              path:"/jobs/hiring/applicants",
              element:<HiringApplications/>

            },
            {
              path:"/jobs/hiring/interviews",
              element:<HiringInterviews/>

            },
            {
              path:"/jobs/hiring/view-job",
              element:<ViewJob/>
            },
            {
              path:"/jobs/hiring/add-job",
              element:<AddJob/>
            },
            {
              path:"/jobs/hiring/edit-job/:jobId",
              element:<EditJob/>
            }
          ]
        },{
          path:"/jobs/open-to-work",
          element:<JobsOpenToWork/>,
          children:[
            {
              path:"/jobs/open-to-work/job-list",
              element:<Jobs />
            },
            {
              path:"/jobs/open-to-work/applications",
              element:<Applications/>

            },
            {
              path:"/jobs/open-to-work/interviews",
              element:<Interviews/>
            }
          ]
        }
      ]
    },
    {
      path:"/profile",
      element:<Profile/>,
      children:[
        {
          path:"bio",
          element:<UserBio/>,
        },
        {
          path:"user-posts",
          element:<UserPost/>,
        },
        {
          path:"settings",
          element:<Settings/>
        }
      ]
        },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/otp",
      element: <OtpPage />,
    },
    {
      path: "/forgot-otp",
      element: <PasswordOtp />,
    },
    {
      path: "/change-password",
      element: <ChangePassword />,
    },
    {
        path:"/register-success",
        element:<RegisterSucces/>
    },
    adminRouter,  
    adminLoginRouter,
  
  ]);
  

export default appRouter;