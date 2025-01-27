import React, { useState, useEffect } from "react";
import RegisterFormComponent from "../components/auth/RegisterFormComponent";

const RegisterPage = () => {
  return (
    <>
      <h3 className="text-primary py-2 w-full my-2 text-center text-3xl font-thin">
        Register Page
      </h3>
      <div className="max-w-md mx-auto mt-10"></div>
      <div className="grid grid-rows-1 grid-cols-2 gap-4 border border-primary-300  p-4 my-11 shadow-xl max-w-4xl mx-auto rounded-xl">
        <div>
          <img src="images/register.png" className="h-full" />
        </div>
        <div>
          <RegisterFormComponent />
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
