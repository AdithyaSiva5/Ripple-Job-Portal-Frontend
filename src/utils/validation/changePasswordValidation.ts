import * as Yup from "yup"

export interface FormValues{
    password: string;
    confirmPassword: string;
}
export const initialValues: FormValues = {
    password: "",
    confirmPassword: "",
}
export const validationSchema = Yup.object({
    password: Yup.string().trim()
    .min(8,"Password must be at least 8 characters")
    .required("Password is required"),
    confirmPassword: Yup.string().trim()
    .oneOf([Yup.ref("password")],"Passwords must match")
    .required("Confirm Password is required")
})