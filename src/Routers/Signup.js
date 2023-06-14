import { useFormik } from "formik";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import HeaderPage from "./HeaderPage";
const Signup = () => {
  const navTo=useNavigate();
  const fieldValidationSchema = yup.object({
    username: yup
      .string()
      .required("Please enter valid username"),
    email: yup
      .string()
      .required("Please enter valid email"),
    password: yup
      .string()
      .required("Please enter valid password"),
  });

  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        username:"",
        email: "",
        password: "",
      },
      validationSchema: fieldValidationSchema,
      onSubmit: async (signUpInfo) => {
        try {
            const response=await fetch("https://guvi-password-task.vercel.app/signup",
            {
              method: "POST",
              body: JSON.stringify(signUpInfo),
              headers: {
                "Content-Type": "application/json",
              },
            }
            );
            const data=await response.json();
            if(data.message === "SignUp success"){
              navTo('/')
            }
              
        } catch (error) {
            console.log("Error....",error)
        }
      },
    });

  return (
    <div className="">
      <HeaderPage/>
        <h1>SignUp Page</h1>
      <form className="text-start p-5" onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="exampleInputEmail1">Username</label>
          <input
            type="username"
            className={`form-control my-2 ${
              touched.username && errors.username ? "border-danger border-2" : ""
            }`}
            id="username"
            aria-describedby="usernameHelp"
            placeholder={`${
              touched.username && errors.username ? errors.username : "Enter username"
            }`}
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className={`form-control my-2 ${
              touched.email && errors.email ? "border-danger border-2" : ""
            }`}
            id="email"
            aria-describedby="emailHelp"
            placeholder={`${
              touched.email && errors.email ? errors.email : "Enter email"
            }`}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            className={`form-control my-2 ${
              touched.password && errors.password
                ? "border-danger border-2"
                : ""
            }`}
            id="password"
            placeholder={` ${
              touched.password && errors.password ? errors.password : "Enter password"
            }`}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="text-center m-3">
          <button type="submit" className="btn btn-success px-5">
            SignUp
          </button>
        </div>
      </form>
      <div>
        <NavLink className="mb-3" to='forgetpassword'>Forget Password</NavLink><br/>
        <NavLink className="mb-3" to='signup'>SignUp</NavLink>
      </div>
    </div>
  );
};

export default Signup;
