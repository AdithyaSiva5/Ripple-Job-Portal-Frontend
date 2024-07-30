import { toast } from "sonner";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./otpPage.css";
import { postOTP, postResendOTP } from "../../../services/api/user/apiMethods";
import { useSelector } from "react-redux";
import { darkMode } from "../../../utils/context/reducers/darkmodeSlice";

function OtpPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email") || "";

  const [otp1, setOtp1] = useState<string>("");
  const [otp2, setOtp2] = useState<string>("");
  const [otp3, setOtp3] = useState<string>("");
  const [otp4, setOtp4] = useState<string>("");
  const navigate = useNavigate();
  const otp1Ref = useRef<HTMLInputElement>(null);
  const otp2Ref = useRef<HTMLInputElement>(null);
  const otp3Ref = useRef<HTMLInputElement>(null);
  const otp4Ref = useRef<HTMLInputElement>(null);

  const initialTimer = parseInt(localStorage.getItem("otpTimer") || "60");
  const [timer, setTimer] = useState<number>(initialTimer);
  const [resend, setResend] = useState<boolean>(false);

  const dark = useSelector(darkMode);

  useEffect(() => {
    if (!dark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [dark]);


  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
        localStorage.setItem("otpTimer", (timer - 1).toString());
      } else {
        clearInterval(countdownInterval);
        setResend(true);
        toast.error("Time expired please resend otp");
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [timer]);

  const startResendTimer = () => {
    setResend(false);
    setTimer(60);
    localStorage.setItem("otpTimer", "60");
  };

  const handleResendClick = () => {
    console.log("hello");
    startResendTimer();
    setOtp1("");
    setOtp2("");
    setOtp3("");
    setOtp4("");
    postResendOTP({ email: email })
      .then((response: any) => {
        toast.success("OTP has been resend to" + response.data.email);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOtpChange = (
    otp: string,
    setOtp: React.Dispatch<React.SetStateAction<string>>,
    prevRef: React.RefObject<HTMLInputElement> | null,
    nextRef: React.RefObject<HTMLInputElement> | null
  ) => {
    const regex = /^[0-9\b]+$/;
    if (otp === "" || regex.test(otp)) {
      setOtp(otp);
      if (otp === "" && prevRef && prevRef.current) {
        prevRef.current.focus();
      } else if (otp.length === 1 && nextRef && nextRef.current) {
        nextRef.current.focus();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (timer === 0) {
      setResend(true);
      toast.info("OTP has expired Please resent");
      return;
    }

    const otp: string = otp1 + otp2 + otp3 + otp4 || "";
    if (otp.trim().length !== 4) {
      toast.error("Enter a Valid OTP");
      return;
    }

    const payload = { otp };
    postOTP(payload)
      .then((response: any) => {
        localStorage.removeItem("otpTimer");
        const data = response.data;
        if (response.status === 200) {
          toast.success(data.message);
          navigate("/register-success");
        } else {
          console.log(response.message);
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.log(error?.message);
      });
  };

  return (
    <div className="flex h-screen bg-primary">
      <div
        id="otp"
        className="hidden login lg:flex items-center justify-center flex-1 dark:bg-[#1B1F24] text-black"
      ></div>

      <div className="w-full  lg:w-1/2 flex items-center justify-center">
        <div className="logo">
          {" "}
          <img src="https://i.postimg.cc/wvvhmZhZ/ripple-logo.png" alt="" />
        </div>

        <div className="max-w-md w-full p-6">
          <p className="title text-4xl font-black  mb-2 text-black dark:text-white">
            OTP verification.
          </p>
          <h1 className="text-sm  mb-6 text-gray-500 ">
            We sent a code to {email}
          </h1>
          <div className="mt-4 flex flex-col lg:flex-row items-center justify-between"></div>
          <div className="mt-4 text-xs text-gray-600 text-center"></div>

          <form onSubmit={handleSubmit} method="post">
            <div className="flex flex-col space-y-8">
              <div className="flex justify-between">
                <div className="w-16 h-16">
                  <input
                    ref={otp1Ref}
                    type="text"
                    value={otp1}
                    onChange={(e) =>
                      handleOtpChange(e.target.value, setOtp1, null, otp2Ref)
                    }
                    maxLength={1}
                    className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-green-700"
                  />
                </div>
                <div className="w-16 h-16">
                  <input
                    ref={otp2Ref}
                    type="text"
                    value={otp2}
                    onChange={(e) =>
                      handleOtpChange(e.target.value, setOtp2, otp1Ref, otp3Ref)
                    }
                    maxLength={1}
                    className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-green-700"
                  />
                </div>
                <div className="w-16 h-16">
                  <input
                    ref={otp3Ref}
                    type="text"
                    value={otp3}
                    onChange={(e) =>
                      handleOtpChange(e.target.value, setOtp3, otp2Ref, otp4Ref)
                    }
                    maxLength={1}
                    className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-green-700"
                  />
                </div>
                <div className="w-16 h-16">
                  <input
                    ref={otp4Ref}
                    type="text"
                    value={otp4}
                    onChange={(e) =>
                      handleOtpChange(e.target.value, setOtp4, otp3Ref, null)
                    }
                    maxLength={1}
                    className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-green-700"
                  />
                </div>
              </div>

              <div className="flex justify-between  items-center ">
                <div className="flex gap-2  items-center">
                  <p className="text-xs text-grey-600 dark:text-white">
                    Expires in {timer} seconds
                  </p>
                </div>
                {resend ? (
                  <button
                    onClick={handleResendClick}
                    className="text-xs font-semibold text-red-600 hover:underline focus:outline-none"
                  >
                    Resend OTP
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full text-sm bg-green-600 text-white p-3 mt-5 rounded-md hover:bg-gray-800  focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                >
                  Verify Account
                </button>
              </div>
            </div>
          </form>

          <div className="mt-4 text-xs text-gray-600 text-center">
            <p>
              didn't Recive an OTP?{" "}
              <Link
                className="font-semibold text-green-600 hover:underline"
                to="/"
              >
                Click here
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpPage;
