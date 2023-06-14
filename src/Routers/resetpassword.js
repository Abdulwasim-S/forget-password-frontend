import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import HeaderPage from "./HeaderPage";
const Resetpassword = () => {
  const [state, setState] = useState(false);
  const [buttonState, setButtonState] = useState(false);
  const navTo = useNavigate();
  const fieldValidationSchema = yup.object({
    email: yup.string().required("Please enter valid email"),
    password: yup.string().required("Please enter valid password"),
  });

  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        email: localStorage["password-resetting-mail"],
        password: "",
        confirmpassword: "",
      },
      validationSchema: fieldValidationSchema,
      onSubmit: async (loginInfo) => {
        if (loginInfo.password !== loginInfo.confirmpassword) {
          setState(true);
        } else {
          setState(false);
          setButtonState(true)
          try {
            const response = await fetch(
              "https://guvi-password-task.vercel.app/resetpassword",
              {
                method: "PUT",
                body: JSON.stringify(loginInfo),
                headers: {
                  "Content-Type": "application/json",
                  "x-auth-token": localStorage["forget-password-token"],
                },
              }
            );
            const data = await response.json();
            if(data.message === 'Updated Success'){
              navTo("/success");
            }
            
            
          } catch (error) {}
        }
      },
    });

  return (
    <div>
      <HeaderPage />
      <h1>Password reset page</h1>
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
            disabled
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
              touched.password && errors.password
                ? errors.password
                : "Enter password"
            }`}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Confirm Password</label>
          <input
            type="password"
            className={`form-control my-2 ${
              touched.confirmpassword && errors.confirmpassword
                ? "border-danger border-2"
                : ""
            }`}
            id="confirmpassword"
            placeholder={` ${
              touched.confirmpassword && errors.confirmpassword
                ? errors.confirmpassword
                : "Confirm password"
            }`}
            value={values.confirmpassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="text-center m-3">
          {state && <p className="text-danger">Password doesn't match</p>}
          {!buttonState && <button type="submit" className="btn btn-success px-5">
            Change Password
          </button>}
          {buttonState && <button type="button" className="btn btn-success px-5" disabled>
            Please Wait...
          </button>}
        </div>
      </form>
    </div>
  );
};

export default Resetpassword;
