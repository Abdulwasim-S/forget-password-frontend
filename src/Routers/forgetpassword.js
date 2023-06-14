import { useFormik } from "formik";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import HeaderPage from "./HeaderPage";

const Forgetpassword = () => {
  const navTo=useNavigate();
  const fieldValidationSchema = yup.object({
    email: yup
      .string()
      .required("Please enter valid email")
  });

  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: fieldValidationSchema,
      onSubmit: async (loginInfo) => {
        try {
            const response=await fetch("https://guvi-password-task.vercel.app/forgetpassword",
            {
              method: "POST",
              body: JSON.stringify(loginInfo),
              headers: {
                "Content-Type": "application/json",
              },
            }
            );
            const data=await response.json();
            if(data.token) {
              localStorage.setItem("forget-password-token", data.token);
              localStorage.setItem("password-resetting-mail",loginInfo.email);
              navTo('/checkmail')
            }
            else{
              console.log(data.message)
            }
              
        } catch (error) {
            console.log("Error....",error)
        }
      },
    });

  return (
    <div className="">
      <HeaderPage/>
        <h1>Forget Password</h1>
      <form className="text-start p-5" onSubmit={handleSubmit}>
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
        <div className="text-center m-3">
          <button type="submit" className="btn btn-primary px-5">
            Next
          </button>
        </div>
      </form>
      <div>
        <NavLink className="mb-3" to='/'>back to login page</NavLink>
      </div>
    </div>
    
  );
};

export default Forgetpassword;
