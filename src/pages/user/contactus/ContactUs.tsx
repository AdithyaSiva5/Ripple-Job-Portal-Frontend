import { useState } from "react";
import { toast } from "sonner";
import Header2 from "../../../components/Header2";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const validate = () => {
    const errors = { name: "", email: "", subject: "", message: "" };
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.subject) errors.subject = "Subject is required";
    if (!formData.message) errors.message = "Message is required";
    return errors;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.values(validationErrors).every((error) => error === "")) {
      toast.success("Form submitted successfully");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }
  };

  return (
    <>
      <Header2 />
      <div className="flex flex-col lg:flex-row h-auto lg:h-screen">
        <div className="h-80 hidden lg:flex items-center justify-center flex-1 bg-white dark:bg-fill text-black"></div>
        <div className="lg:flex hidden">
          <div className="bg-green-800 w-10 h-10 rounded-full fixed top-1/3 left-48"></div>
          <div className="bg-green-600 w-20 h-20 rounded-full fixed top-80 left-1/3 animate-pulse"></div>
          <div className="border-2 border-green-800 w-40 h-40 rounded-full left-72 fixed top-80 animate-bounce"></div>
          <div className="bg-green-600 w-56 h-10 rounded-full fixed top-96 left-40 animate-pulse"></div>
          <div className="bg-green-200 w-10 h-10 rounded-full left-12 fixed top-80"></div>
          <div className="border-2 border-green-600 w-56 h-10 left-12 rounded-full fixed top-80"></div>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center p-5 lg:p-0 me-5">
          <div>
            <div className="grid sm:grid-cols-2 items-center gap-16 p-8 mx-auto max-w-4xl bg-secondary border rounded-md text-[#333]">
              <div>
                <h1 className="title text-black text-4xl dark:text-white">Let's Talk</h1>
                <p className="text-xs text-gray-400 mt-3">
                  We're here to support your job search journey! Contact us at
                  ripplejobportal@gmail.com for prompt assistance and expert
                  guidance.
                </p>
                <div className="mt-12">
                  <h2 className="text-xs dark:text-white">Email</h2>
                  <ul className="mt-3">
                    <li className="flex items-center">
                      <div className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20px"
                          height="20px"
                          fill="green"
                          viewBox="0 0 479.058 479.058"
                        >
                          <path
                            d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                            data-original="#000000"
                          />
                        </svg>
                      </div>
                      <a
                        target="blank"
                        href="mailto:circleup@gmail.com"
                        className="text-green-600 text-xs ml-3"
                      >
                        <small className="block">Mail</small>
                        <strong>ripplejobportal@gmail.com</strong>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="mt-12">
                  <p className="green text-xs dark:text-white">Socials</p>
                  <ul className="flex mt-3 space-x-4">
                    <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                      <a href="javascript:void(0)">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20px"
                          height="20px"
                          fill="green"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M6.812 13.937H9.33v9.312c0 .414.335.75.75.75l4.007.001a.75.75 0 0 0 .75-.75v-9.312h2.387a.75.75 0 0 0 .744-.657l.498-4a.75.75 0 0 0-.744-.843h-2.885c.113-2.471-.435-3.202 1.172-3.202 1.088-.13 2.804.421 2.804-.75V.909a.75.75 0 0 0-.648-.743A26.926 26.926 0 0 0 15.071 0c-7.01 0-5.567 7.772-5.74 8.437H6.812a.75.75 0 0 0-.75.75v4c0 .414.336.75.75.75zm.75-3.999h2.518a.75.75 0 0 0 .75-.75V6.037c0-2.883 1.545-4.536 4.24-4.536.878 0 1.686.043 2.242.087v2.149c-.402.205-3.976-.884-3.976 2.697v2.755c0 .414.336.75.75.75h2.786l-.312 2.5h-2.474a.75.75 0 0 0-.75.75V22.5h-2.505v-9.312a.75.75 0 0 0-.75-.75H7.562z"
                            data-original="#000000"
                          />
                        </svg>
                      </a>
                    </li>
                    <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                      <a href="javascript:void(0)">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20px"
                          height="20px"
                          fill="green"
                          viewBox="0 0 511 512"
                        >
                          <path
                            d="M111.898 160.664H15.5c-8.285 0-15 6.719-15 15V497c0 8.285 6.715 15 15 15h96.398c8.286 0 15-6.715 15-15V175.664c0-8.281-6.714-15-15-15zM96.898 482H30.5V190.664h66.398zM63.703 0C28.852 0 .5 28.352.5 63.195c0 34.852 28.352 63.2 63.203 63.2s63.203-28.348 63.203-63.2C126.906 28.352 98.554 0 63.703 0zm0 96.398c-18.303 0-33.203-14.898-33.203-33.203s14.9-33.195 33.203-33.195 33.203 14.895 33.203 33.195-14.899 33.203-33.203 33.203zM386.5 120c-69.7 0-105.898 37.5-123.5 64.703V175.664c0-8.281-6.715-15-15-15h-96.399c-8.285 0-15 6.719-15 15V497c0 8.285 6.715 15 15 15H248c8.285 0 15-6.715 15-15v-158.36c0-34.836 12.895-68.852 46.703-68.852 33.9 0 37.297 37.2 37.297 69.34V497c0 8.285 6.715 15 15 15h96.398c8.285 0 15-6.715 15-15V307.359C464.398 220.625 426.742 120 386.5 120zm63.398 361.68H385.5V339.125c0-36.398-6.699-99.34-67.297-99.34-64.796 0-76.703 63.399-76.703 98.86V482h-74.598V190.664H248v24.699c7.5-9.293 42.899-58.102 112.699-58.102 40.601 0 89.199 54.797 89.199 150.199z"
                            data-original="#000000"
                          />
                        </svg>
                      </a>
                    </li>
                    <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                      <a href="javascript:void(0)">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20px"
                          height="20px"
                          fill="green"
                          viewBox="0 0 30 30"
                        >
                          <path d="M30 15.016C30 6.72 23.284 0 15 0S0 6.72 0 15.016c0 7.506 5.48 13.742 12.67 15v-10.6H8.85v-4.39h3.82v-2.94c0-3.79 2.253-5.88 5.697-5.88 1.65 0 3.373.296 3.373.296v3.72h-1.9c-1.874 0-2.455 1.166-2.455 2.364v2.44h4.177l-.668 4.39h-3.51V30c7.19-1.258 12.67-7.494 12.67-14.984z" />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className={` border-gray-300  mt-2 text-xs border rounded-md py-2 px-3 block w-full focus:outline-none focus:ring-2 focus:ring-green-600 ${
                      errors.name && "border-red-500"
                    }`}
                  />
                  {errors.name && (
                    <small className="text-red-600">{errors.name}</small>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className={`  border-gray-300  mt-2 text-xs border rounded-md py-2 px-3 block w-full focus:outline-none focus:ring-2 focus:ring-green-600 ${
                      errors.email && "border-red-500"
                    }`}
                  />
                  {errors.email && (
                    <small className="text-red-600">{errors.email}</small>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className={`  border-gray-300 mt-2  text-xs border rounded-md py-2 px-3 block w-full focus:outline-none focus:ring-2 focus:ring-green-600 ${
                      errors.subject && "border-red-500"
                    }`}
                  />
                  {errors.subject && (
                    <small className="text-red-600">{errors.subject}</small>
                  )}
                </div>
                <div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    rows={6}
                    className={`  border-gray-300  mt-2 text-xs border rounded-md py-2 px-3 block w-full focus:outline-none focus:ring-2 focus:ring-green-600 ${
                      errors.message && "border-red-500"
                    }`}
                  ></textarea>
                  {errors.message && (
                    <small className="text-red-600">{errors.message}</small>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-green-600 mt-5 py-3 hover:bg-gray-700 text-white px-4 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
