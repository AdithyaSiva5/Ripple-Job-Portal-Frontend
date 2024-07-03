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
import adminRoutes from "./AdminRouter";
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
import Protect from "../routes/protectRoutes/ProtectRoutes";
import PageNotFound from "../components/errorComponents/ErrorPage";
import NotAuthorized from "../components/errorComponents/NotAuthorised";
import ErrorPage from "../components/errorComponents/ErrorPage";
import People from "../pages/user/people/People";
import PeopleDiscover from "../components/PeopleDiscover";
import PeopleConnections from "../components/PeopleConnections";
import PeopleRequests from "../components/PeopleRequests";
import PeopleRequested from "../components/PeopleRequested";
import ViewerProfile from "../pages/visitProfile/ViewerProfile";
import ViewerBio from "../components/ViewerBio";
import ViewerPosts from "../components/ViewerPost";
import ViewerJobs from "../components/ViewerJobs";
import ViewerConnections from "../components/ViewerConnections";


const appRouter = createBrowserRouter([
    {
        path:"/",
        element:<Landing/>
    },
    {
      path: "/home",
      element: <Protect><App /></Protect>,
      children: [
        {
          path: "/home",
          element: <UserHome />,
        },
      ],
    },
    {
      path:"/people",
      element: (
        <Protect>
       <App/>
        </Protect>
      )
      ,
      errorElement:<ErrorPage/>
     ,
      children:[
        {
          path:"/people",
          element:<People/>, 
          children:[
            {
              path:"/people/discover",
              element:<PeopleDiscover/>
            },
            {
              path:"/people/connections",
              element:<PeopleConnections/>
            },
            {
              path:"/people/requests",
              element:<PeopleRequests/>
            },
            {
              path:"/people/requested",
              element:<PeopleRequested/>
            },
          ]
        },
       
      ]
    },
    {
      path:"/jobs",
      element: <Protect><App /></Protect>,
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
        },
        {
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
      path:"/visit-profile/",
      element:<ViewerProfile/>
      ,
  errorElement:<ErrorPage/>,
      
      children:[
        {
          path:"bio/:userId",
          element:<ViewerBio/>,
        },
        {
          path:"posts/:userId",
          element:<ViewerPosts/>,
        },
        {
          path:"jobs/:userId",
          element:<ViewerJobs/>
        },
        
        {
          path:"connections/:userId",
          element:<ViewerConnections/>
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
    {
      path: '*',
      element: <PageNotFound />,
    },
    {
      path: '/not-authorized',
      element: <NotAuthorized />,
    },
    ...adminRoutes,
]);

export default appRouter;