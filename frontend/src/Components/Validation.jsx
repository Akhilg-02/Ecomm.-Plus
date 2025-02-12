import * as Yup from "yup";

export const registerValidation = Yup.object().shape({
    name: Yup.string().required("Please enter valid name"),
    email: Yup.string()
      .email("Please enter valid email")
      .required("Email is required"),
    password: Yup.string()
    .required('Password is required, Must contain at least one number, one uppercase, one lowercase letter, and at least 8 or more characters')
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number"),
  });

export const loginValidation = Yup.object().shape({
    email: Yup.string()
      .email("Please enter valid email")
      .required("Email is required"),
    password: Yup.string()
    .required('Password is required, Must contain at least one number, one uppercase, one lowercase letter, and at least 8 or more characters')
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number"),
  });