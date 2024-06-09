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

createBrowserRouter


const appRouter = createBrowserRouter([
    {
        path:"/",
        element:<Landing/>
          // errorElement: <Error />,
    },
    {
      path: "/home",
      element: <App />,
      // errorElement: <Error />,
      children: [
        {
          path: "/home",
          element: <UserHome />,
        },
        // {
        //   path: "/profile/:username",
        //   element: <UserProfile />,
        // },
      ],
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