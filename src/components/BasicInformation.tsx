import { useRef, useState } from "react";
import { Modal } from "flowbite-react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../utils/context/reducers/authSlice";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import TextError from "./TextError";
import * as Yup from "yup";
import { ImagePlus } from "lucide-react";
import PreviewImage from "./PreviewImage";
import ProfilePreviewImage from "./ProfilePreviewImage";


function BasicInformation() {
  const selectUser = (state: any) => state.auth.user || "";
  const user = useSelector(selectUser) || "";
  const userId = user._id || "";
  const dispatch = useDispatch();

  const fileInputRef = useRef<HTMLInputElement>(null);


  const formik = useFormik({
    initialValues: {
      image: "",
    },
    validationSchema: Yup.object({
      image: Yup.mixed()
        .required("Image file required")
        .test(
          "FILE_TYPE",
          "Invalid file type",
          (value: any) =>
            value && ["image/png", "image/jpeg"].includes(value.type)
        )
        .test(
          "FILE_SIZE",
          "File size too big",
          (value: any) => value && value.size < 1024 * 1024
        ),
    }),
    onSubmit: async () => {},
  });
  const basicFormInitialValues = {
    image: "",
    fullname: "",
    location: "",
    designation: "",
    dateOfBirth: "",
    phone: "",
    gender: "",
    about: "",
  };

  const basicFormValidationSchema = Yup.object({
    image: Yup.mixed()
    .test('FILE_TYPE', 'Invalid file type', (value:any) =>
      value && ['image/png', 'image/jpeg'].includes(value.type)
    )
    .test('FILE_SIZE', 'File size too big', (value:any) => value && value.size < 1024 * 1024),
 
    fullname: Yup.string()
      .trim()
      .matches(/^[A-Za-z\s]+$/, "Full Name cannot contain numbers")
      .required("Full Name is required"),
    location: Yup.string().trim().required("Location is required"),
    designation: Yup.string().trim().required("Designation is required"),
    dateOfBirth: Yup.date()
      .max(new Date(), "Date of Birth must be today or earlier")
      .nullable()
      .required("Date of Birth is required"),
    phone: Yup.string()
      .trim()
      .matches(
        /^[0-9]{10}$/,
        "Phone number must be exactly 10 digits and only contain numbers"
      )
      .required("Phone is required"),
    gender: Yup.string().trim().required("Gender is required"),
    about: Yup.string().trim().required("About is required"),
  });

  const BasicFormHandleSubmit = (values: any) => {
    console.log(values);
  };

    const handleFileChange = (formik:any, file:any) => {
      formik.setFieldValue('image', file);
    };
  
    const handleButtonClick = (formik:any) => {
      formik.setFieldTouched('image', true);
      fileInputRef.current?.click();
    };

  

  return (
    <div>
      <Modal show={true}>
        <Modal.Body>
         
          <p className="text-sm font-semibold">Basic Information</p>
        </Modal.Body>
        
        {user.userType == "individual" && (
          
          <Modal.Footer className="flex items-start">
                 <Formik
                initialValues={basicFormInitialValues}
                validationSchema={basicFormValidationSchema}
                onSubmit={BasicFormHandleSubmit}
              >
                 {(formik) => (
                <Form className="flex w-full">
            <div  className="w-1/3 flex items-center flex-col ">
            <div className="flex flex-col text-gray-500  mt-4  gap-4">
            <Field name="image">
              {({ field }:any) => (
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const files = e.target.files
                    if (files && files.length > 0) {
                      formik.setFieldValue('image', files[0]);
                    }
                  }}
                />
              )}
            </Field>
            <div className="flex items-center justify-center ">
                        {(!formik.values.image || formik.errors.image) && (
                          <div className="w-28 h-28 flex flex-col gap 10 items-center border rounded-full">
                         <img className="w-28 h-28 rounded-full" src={user.profileImageUrl} alt="" />
                          </div>
                        )}
                        {formik.values.image && !formik.errors.image && (

                          <ProfilePreviewImage file={formik.values.image} />
                        )}
                      </div>

            <div>
              <button
              className="text-xs border px-5 py-2 rounded-md"
                type="button"
                onClick={() => {
                  formik.setFieldTouched('image', true);
                  fileInputRef.current?.click();
                }}
              >
                Choose Image
              </button>
              <ErrorMessage name="image" component="p" className="text-red-600 text-xs" />
            </div>


          
          </div>
            </div>
            <div className="w-full">
         
                  <div className="flex gap-2">
                    <div className="w-full">
                      <Field
                        type="text"
                        id="fullname"
                        placeholder="Full Name"
                        name="fullname"
                        className="mt-5 text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                      />
                      <ErrorMessage name="fullname" component={TextError} />
                    </div>
                    <div className="w-1/3">
                      <Field
                        type="text"
                        id="location"
                        placeholder="Location"
                        name="location"
                        className="mt-5 text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                      />
                      <ErrorMessage name="location" component={TextError} />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="w-full">
                      <Field
                        type="text"
                        id="designation"
                        placeholder="Designation"
                        name="designation"
                        className="mt-5 text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                      />
                      <ErrorMessage name="designation" component={TextError} />
                    </div>

                    <div className="w-full">
                      <Field
                        type="date"
                        id="dateOfBirth"
                        placeholder="Date of Birth"
                        name="dateOfBirth"
                        className="text-gray-500 mt-5 text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                      />
                      <ErrorMessage name="dateOfBirth" component={TextError} />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-full">
                      <Field
                        type="text"
                        id="phone"
                        placeholder="Phone"
                        name="phone"
                        className="text-gray-500 mt-5 text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                      />
                      <ErrorMessage name="phone" component={TextError} />
                    </div>
                    <div className="w-1/3">
                      <Field
                        as="select"
                        id="gender"
                        name="gender"
                        className=" text-gray-500 mt-5 text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                      >
                        <option value="">Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="not-specified">Rather Not Say</option>
                      </Field>
                      <ErrorMessage name="gender" component={TextError} />
                    </div>
                  </div>
                  <div className="w-full">
                    <Field
                      as="textarea"
                      id="about"
                      placeholder="about"
                      name="about"
                      className="h-20  mt-5 text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                    />
                    <ErrorMessage name="about" component={TextError} />
                  </div>
                  <div className="w-full flex justify-end mt-4">
                    <button
                      type="submit"
                      className=" text-xs rounded btn border w-24 px-4 py-2 cursor-pointer text-white ml-2 bg-gray-900  hover:bg-green-600"
                    >
                      Save
                    </button>
                  </div>
            
            </div>
            </Form>)}
              </Formik>
          </Modal.Footer>
        )}
        {user.userType == "organization" && (
          <Modal.Footer className="flex flex-col items-start">
            <p>company</p>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
}

export default BasicInformation;
