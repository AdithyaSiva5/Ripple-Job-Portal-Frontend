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
    companyType:""
  };

  export const basicFormValidationSchema = Yup.object({
    image: Yup.mixed()
      .test(
        "FILE_TYPE",
        "Invalid file type",
        (value: any) => !value || ['image/png', 'image/jpeg'].includes(value.type)
      )
      .test(
        "FILE_SIZE",
        "File size too big",
        (value: any) => !value || value.size < 1024 * 1024
      ),

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



  export const basicFormCompanyValidationSchema = Yup.object({
    image: Yup.mixed()
      .test(
        "FILE_TYPE",
        "Invalid file type",
        (value: any) => !value || ['image/png', 'image/jpeg'].includes(value.type)
      )
      .test(
        "FILE_SIZE",
        "File size too big",
        (value: any) => !value || value.size < 1024 * 1024
      ),

    fullname: Yup.string()
      .trim()
     
      .required("Company Name is required"),
    location: Yup.string().trim().required("Location is required"),
    noOfEmployees: Yup.string().trim().required("No of employees is required"),
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
    about: Yup.string().trim().required("About is required"),
    companyType: Yup.string().trim().required("Company type is required"),
  });