import * as Yup from "yup";

export interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const initialValues: FormValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const validationSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Username must only contain letters and numbers")
    .min(3, "Username must be at least 3 characters")
    .max(10, "Username must be at most 10 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
