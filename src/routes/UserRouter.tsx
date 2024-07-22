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
import ErrorPage from "../components/errorComponents/ErrorPage";
import People from "../pages/user/people/People";
import PeopleDiscover from "../components/PeopleDiscover";
import PeopleConnections from "../components/PeopleConnections";
import PeopleRequests from "../components/PeopleRequests";
import PeopleRequested from "../components/PeopleRequested";
import ViewerProfile from "../pages/user/visitProfile/ViewerProfile";
import ViewerBio from "../components/ViewerBio";
import ViewerPosts from "../components/ViewerPost";
import ViewerJobs from "../components/ViewerJobs";
import ViewerConnections from "../components/ViewerConnections";
import NotAuthorized from "../components/errorComponents/NotAuthorised";
import Chat from "../pages/user/chat/Chat";
import InterviewCall from "../pages/user/interviewCall/interviewCall";
import JobsDetails from "../pages/user/jobs/JobDetails";
import ViewJobApplications from "../components/ViewJobApplications";
import ViewJobInterviews from "../components/ViewJobInterviews";
import ProtectedVideoCall from "../components/ProtectedVideoCall";
import PremiumPlans from "../pages/user/premiumPage/PremiumPlans";
import Premium from "../components/Premium";
import PaymentSuccess from "../components/PaymentSuccess";
import PaymentFailed from "../components/PaymentFailed";
import Notifications from "../components/Notifications";
import SavedCollections from "../components/SavedCollections";
import SavedPosts from "../components/SavedPosts";
import SavedJobs from "../components/SavedJobs";
import PageNotFound from "../components/errorComponents/ErrorPage";
import SearchPage from "../pages/user/search/SearchPage";
import SearchPost from "../components/SearchPost";
import SearchPeople from "../components/SearchPeople";
import SearchJobs from "../components/SearchJobs";



const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Landing />
  },
  {
    path: "/home",
    element: <Protect><App /></Protect>,
    children: [
      {
        path: "/home",
        element: <UserHome />,
      },
      {
        path: "/home/notifications",
        element: (

          <Notifications />
        )
      },
      {
        path: "/home/saved",
        element: <SavedCollections />,
        children: [
          {
            path: "/home/saved/posts",
            element: <SavedPosts />
          },
          {
            path: "/home/saved/jobs",
            element: <SavedJobs />

          }
        ]
      }
    ],
  },
  {
    path: "/people",
    element: (
      <Protect>
        <App />
      </Protect>
    )
    ,
    errorElement: <ErrorPage />
    ,
    children: [
      {
        path: "/people",
        element: <People />,
        children: [
          {
            path: "/people/discover",
            element: <PeopleDiscover />
          },
          {
            path: "/people/connections",
            element: <PeopleConnections />
          },
          {
            path: "/people/requests",
            element: <PeopleRequests />
          },
          {
            path: "/people/requested",
            element: <PeopleRequested />
          },
        ]
      },

    ]
  },
  {
    path: "/jobs",
    element: <Protect><App /></Protect>,
    children: [
      {
        path: "/jobs/hiring",
        element: <JobsHiring />,
        children: [
          {
            path: "/jobs/hiring/job-list",
            element: <HiringJobList />
          },
          {
            path: "/jobs/hiring/applicants",
            element: <HiringApplications />
          },
          {
            path: "/jobs/hiring/interviews",
            element: <HiringInterviews />
          },
          {
            path: "/jobs/hiring/interview-call/:roomId",
            element: <InterviewCall />
          },
          {
            path: "/jobs/hiring/view-job/:jobId",
            element: <ViewJob />
          },
          {
            path: "/jobs/hiring/add-job",
            element: <AddJob />
          },
          {
            path: "/jobs/hiring/edit-job/:jobId",
            element: <EditJob />
          }
        ]
      },
      {
        path: "/jobs/open-to-work",
        element: <JobsOpenToWork />,
        children: [
          {
            path: "/jobs/open-to-work/job-list",
            element: <Jobs />
          },
          {
            path: "/jobs/open-to-work/applications",
            element: <Applications />
          },
          {
            path: "/jobs/open-to-work/interviews",
            element: <Interviews />
          },
          {
            path: "/jobs/open-to-work/interview-call/:roomId",
            element: <InterviewCall />
          },
        ]
      }, {
        path: "/jobs/view-job/",
        element: (
          <Protect>
            <JobsDetails />
          </Protect>
        )
        ,
        errorElement: <ErrorPage />

        ,
        children: [
          {
            path: "/jobs/view-job/job-info/:jobId",
            element: <ViewJob />
          },
          {
            path: "/jobs/view-job/applications/pending/:jobId",
            element: <ViewJobApplications />

          },
          {
            path: "/jobs/view-job/applications/accepted/:jobId",
            element: <ViewJobApplications />
          },

          {
            path: "/jobs/view-job/applications/rejected/:jobId",
            element: <ViewJobApplications />
          },
          {
            path: "/jobs/view-job/interviews/:jobId",
            element: <ViewJobInterviews />
          },
          {
            path: "/jobs/view-job/interview-call/:roomId",
            element: <InterviewCall />
          },
        ]
      }
    ]
  }, {
    path: '/search',
    element: (
      <Protect>
        <App />
      </Protect>
    )
    ,
    errorElement: <ErrorPage />
    ,
    children: [
      {
        path: "/search",
        element: <SearchPage />,
        children: [
          {
            path: "/search/posts",
            element: <SearchPost />
          },
          {
            path: "/search/people",
            element: <SearchPeople />
          },
          {
            path: "/search/jobs",
            element: <SearchJobs />
          },
        ]
      },

    ]


  },
  {
    path: "/profile",
    element: (
      <Protect>
        <Profile />
      </Protect>
    ),
    children: [
      {
        path: "bio",
        element: <UserBio />,
      },
      {
        path: "user-posts",
        element: <UserPost />,
      },
      {
        path: "settings",
        element: <Settings />
      }
    ]
  },

  {
    path: "/visit-profile/",
    element: <ViewerProfile />
    ,
    errorElement: <ErrorPage />,

    children: [
      {
        path: "bio/:userId",
        element: <ViewerBio />,
      },
      {
        path: "posts/:userId",
        element: <ViewerPosts />,
      },
      {
        path: "jobs/:userId",
        element: <ViewerJobs />
      },

      {
        path: "connections/:userId",
        element: <ViewerConnections />
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
    path: "/register-success",
    element: <RegisterSucces />
  }, {
    path: "/chat",
    element: (
      <Protect>
        <Chat />
      </Protect>
    ),
    errorElement: <ErrorPage />

  }, {
    path: "/premium",
    element: (
      <Protect>
        <PremiumPlans />
      </Protect>
    ),
    errorElement: <ErrorPage />
    ,
    children: [
      {
        path: "/premium/plans",
        element: <Premium />,
      },
      {
        path: "/premium/payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "/premium/payment-failed",
        element: <PaymentFailed />,
      }
    ]
  },
  {
    path: "/interview-call/:roomId/:userId",
    element: <ProtectedVideoCall />
    ,
    errorElement: <ErrorPage />

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