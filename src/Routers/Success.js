import React from "react";
import { NavLink } from "react-router-dom";
import HeaderPage from "./HeaderPage";

const Success = () => {
  return (
    <>
      <HeaderPage />
      <div>Password Updated successfully</div>
      <NavLink to="/">click here to login page</NavLink>
    </>
  );
};

export default Success;
