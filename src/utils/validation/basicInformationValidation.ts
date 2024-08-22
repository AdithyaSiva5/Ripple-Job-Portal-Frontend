import * as Yup from "yup";

export const basicFormInitialValues = {
  image: "",
  fullname: "",
  location: "",
  designation: "",
  dateOfBirth: "",
  phone: "",
  gender: "",
  about: "",
};

export const basicFormCompanyInitialValues = {
  image: "",
  fullname: "",
  location: "",
  establishedOn: "",
  phone: "",
  noOfEmployees: "",
  about: "",
  companyType: "",
};

export const basicFormValidationSchema = Yup.object({
  image: Yup.mixed()
    .test(
      "FILE_TYPE",
      "Invalid file type",
      (value: any) => !value || ["image/png", "image/jpeg"].includes(value.type)
    )
    .test(
      "FILE_SIZE",
      "File size too big",
      (value: any) => !value || value.size < 1024 * 1024
    ),

  fullname: Yup.string()
    .trim()
    .min(3, "Full Name must be at least 3 characters")
    .max(20, "Full Name must be at most 20 characters")
    .matches(/^[A-Za-z\s]+$/, "Full Name cannot contain numbers")
    .required("Full Name is required"),
  location: Yup.string()
    .trim()
    .max(20, "Location must be at most 20 characters")
    .required("Location is required"),
  designation: Yup.string()
    .trim()
    .max(20, "Designation must be at most 20 characters")
    .required("Designation is required"),
  dateOfBirth: Yup.date()
    .max(new Date(), "Date of Birth must be today or earlier")
    .nullable()
    .required("Date of Birth is required"),
  phone: Yup.string()
    .trim()
    .matches(
      /^(?!(\d)\1{9})(?!0123456789|1234567890|0987654321)\d{10}$/,
      "Invalid phone number"
    )
    .required("Phone is required"),
  gender: Yup.string().trim().required("Gender is required"),
  about: Yup.string()
    .trim()
    .max(100, "About must be at most 100 characters")
    .required("About is required"),
});

export const basicFormCompanyValidationSchema = Yup.object({
  image: Yup.mixed()
    .test(
      "FILE_TYPE",
      "Invalid file type",
      (value: any) => !value || ["image/png", "image/jpeg"].includes(value.type)
    )
    .test(
      "FILE_SIZE",
      "File size too big",
      (value: any) => !value || value.size < 1024 * 1024
    ),

  fullname: Yup.string()
    .trim()
    .min(3, "Company Name must be at least 3 characters")
    .max(20, "Company Name must be at most 20 characters")
    .required("Company Name is required"),
  location: Yup.string()
    .trim()
    .max(20, "Location must be at most 20 characters")
    .required("Location is required"),
  noOfEmployees: Yup.string()
    .trim()
    .max(20, "Number of employees must be at most 20 characters")
    .required("No of employees is required"),
  establishedOn: Yup.date()
    .max(new Date(), "Date must be today or earlier")
    .nullable()
    .required("Date is required"),
  phone: Yup.string()
    .trim()
    .matches(
      /^[0-9]{10}$/,
      "Phone number must be exactly 10 digits and only contain numbers"
    )
    .required("Phone is required"),
  about: Yup.string()
    .trim()
    .max(100, "About must be at most 100 characters")
    .required("About is required"),
  companyType: Yup.string()
    .trim()
    .max(20, "Company type must be at most 20 characters")
    .required("Company type is required"),
});
