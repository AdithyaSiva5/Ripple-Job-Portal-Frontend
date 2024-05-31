import { Route, Routes } from "react-router-dom";
import Signup from "../pages/user/signupPage/Signup";
import Login from "../pages/user/loginPage/Loginpage";
import OtpPage from "../pages/user/otpPage/OtpPage";
import ForgotPassword from "../pages/user/forgotPasswordPage/ForgotPassword";
import RegisterSucces from "../pages/user/registerSuccess/RegisterSuccess";
import ChangePassword from "../pages/user/changePassword/ChangePassword";
import Landing from "../pages/user/landingPage/Landing";
import UserHome from "../pages/user/userHome/UserHome";
import PasswordOtp from "../pages/user/passwordOtpPage/PasswordOtp";



const UserRouter=()=>{
    return (
        <>
            <Routes>
        <Route  path="/" element={<Landing/>} />
        <Route path="/signup" element={< Signup/>} />
        <Route path="/login" element={< Login/>} />
        <Route path="/otp" element={<OtpPage/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/change-password" element={<ChangePassword/>} />
        <Route path='/forgot-otp' element={<PasswordOtp />} />
        <Route path="/register-success" element={<RegisterSucces/>} />
        <Route  path="/home" element={<UserHome/>} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
    

   
        </Routes>
        </>
    )


}

export default UserRouter;