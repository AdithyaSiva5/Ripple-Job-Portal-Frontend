import { Formik, Form, Field, ErrorMessage } from "formik";
import "./login.css";
import { Link } from "react-router-dom";
import TextError from "../../../components/TextError";
import {
  initialValues,
  validationSchema,
} from "../../../utils/validation/loginValidation";
import {
  googleAuthenticate,
  postLogin,
} from "../../../services/api/user/apiMethods";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../utils/context/reducers/authSlice";
import { auth, provider, fbProvider } from "../../../utils/firebase/config";
import { signInWithPopup } from "firebase/auth";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { darkMode } from "../../../utils/context/reducers/darkmodeSlice";

function Login() {
  const dark = useSelector(darkMode);

  useEffect(() => {
    if (!dark) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }, [dark])

  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submit = (values: any) => {
    postLogin(values)
      .then((response: any) => {
        const data = response.data;
        if (response.status === 200) {
          toast.success(data.message);
          dispatch(loginSuccess({ user: { user: data.user, token: data.accessToken } }));
          navigate("/home");
        } else {
          console.log(response.message);
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.log(error?.message);
        toast.error(error?.message);
      });
  };
  const googleSubmit = () => {
    signInWithPopup(auth, provider).then((data: any) => {
      console.log(data);

      const userData = {
        username: data.user.displayName,
        email: data.user.email,
        imageUrl: data.user.photoURL,
      };

      googleAuthenticate(userData)
        .then((response: any) => {
          const data = response.data;
          if (response.status === 200) {
            toast.success(data.message);
            dispatch(loginSuccess({ user: { user: data.user, token: data.accessToken } }));
            navigate("/home");
          } else {
            console.log(response.message);
            toast.error(data.message);
          }
        })
        .catch((error) => {
          console.log(error?.message);
          toast.error(error?.message);
        });
    });
  };

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);



  return (
    <div className="flex h-screen bg-primary overflow-hidden">
      <div
        id="login"
        className="hidden login lg:flex items-center justify-center flex-1   text-black"
      ></div>

      <div className="w-full  lg:w-1/2 flex items-center justify-center ">
        <div className="logo">
          {" "}
          <img src="https://i.postimg.cc/wvvhmZhZ/ripple-logo.png" alt="" />
        </div>

        <div className="max-w-md w-full p-6">
          <p className="title text-4xl font-black  mb-2 text-black dark:text-white">
            Login to your account.
          </p>
          <h1 className="text-sm  mb-6 text-gray-500 ">
            Explore open career opportunities{" "}
          </h1>
          <div className="mt-4 flex flex-col lg:flex-row items-center justify-between">
            <div className="w-full lg:w-1/2 mb-2 lg:mb-0 flex-grow">
              <button
                onClick={googleSubmit}
                type="button"
                className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1  focus:ring-green-600 transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  preserveAspectRatio="xMidYMid"
                  viewBox="0 0 256 262"
                  id="google"
                >
                  <path
                    fill="#4285F4"
                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                  ></path>
                  <path
                    fill="#EB4335"
                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  ></path>
                </svg>
                <p className="text-xs">Continue with Google</p>
              </button>
            </div>
            {/* <div className="w-full lg:w-1/2 ml-0 lg:ml-2">
              <button onClick={facebookSubmit} type="button" className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1  focus:ring-green-600 transition-colors duration-300">
                
                <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="126.445 2.281 589 589" id="facebook"><circle cx="420.945" cy="296.781" r="294.5" fill="#3c5a9a"></circle><path fill="#fff" d="M516.704 92.677h-65.239c-38.715 0-81.777 16.283-81.777 72.402.189 19.554 0 38.281 0 59.357H324.9v71.271h46.174v205.177h84.847V294.353h56.002l5.067-70.117h-62.531s.14-31.191 0-40.249c0-22.177 23.076-20.907 24.464-20.907 10.981 0 32.332.032 37.813 0V92.677h-.032z"></path></svg>
                 <p className='text-xs'>Continue with Facebook</p>
              </button>
            </div> */}
          </div>
          <div className="mt-4 text-xs text-gray-600 text-center">
            <p>or with email</p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submit}
          >
            <Form className="space-y-4">
              <div>
                <Field
                  type="text"
                  id="email"
                  placeholder="Email"
                  name="email"
                  className="mt-5 text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                />
                <p className="text-yellow-600 text-sm">username: test2@gmail.com</p>
                <ErrorMessage name="email" component={TextError} />
              </div>
              <div>
                <Field
                  type="password"
                  placeholder="Password"
                  id="password"
                  name="password"
                  className="mt-1 text-xs p-3 w-full border  border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                />
                 <p className="text-yellow-600 text-sm">password : abcd1234</p>
                <ErrorMessage name="password" component={TextError} />
              </div>


              <div className="flex justify-between  items-center ">
                <div className="flex gap-2  items-center"></div>

                <Link to="/forgot-password">
                  {" "}
                  <p className="text-xs  text-red-600">Forgot password ?</p>
                </Link>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full text-sm bg-green-600 text-white p-3 mt-5 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black  focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                >
                  Login
                </button>
              </div>
            </Form>
          </Formik>

          <div className="mt-4 text-xs text-gray-600 text-center">
            <p>
              Don't have an account yet?{" "}
              <Link
                className="font-semibold text-green-600 hover:underline"
                to="/signup"
              >
                Register here
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
