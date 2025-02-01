import React, { useState, useEffect } from "react";
import axios from "axios";
import ErrorComponent from "../utils/ErrorComponent";
import SuccessComponent from "../utils/SuccessComponent";
import LoadingComponent from "../utils/LoadingComponent";
import SWAL from "sweetalert2";

const RegisterFormComponent = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      window.location = "/home";
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUser({
      ...user,
      [name]: value,
    });
  };

  const checkPasswords = () => {
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match");
    }
  };

  const registerUser = async (e) => {
    e.preventDefault();
    console.log(user);
    if (
      user.name === "" ||
      user.email === "" ||
      user.mobile === "" ||
      user.password === "" ||
      user.confirmPassword === ""
    ) {
      SWAL.fire({
        title: "Error",
        text: "Please enter all the fields",
        icon: "error",
      });
      return;
    }
    try {
      setLoading(true);

      const result = await axios.post("/api/users/register", user);
      setLoading(false);
      setSuccess(true);
      setUser({
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
      });
      SWAL.fire({
        title: "User Registered Successfully",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      SWAL.fire({
        title: "Error Registering User",
        text: error.response.data.error,
        icon: "error",
      });
    }
  };

  const inputFieldClass =
    "mt-1 block w-full px-3 py-2 gap-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm";
  return (
    <>
      {loading && <LoadingComponent />}
      {/*  {success && <SuccessComponent message="User Registered Successfully" />} */}
      {error && <ErrorComponent error="Error Registering User" />}
      <form className="mt-8 space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={user.name}
            onChange={handleChange}
            required
            className={inputFieldClass}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
            required
            className={inputFieldClass}
          />
        </div>
        <div>
          <label
            htmlFor="mobile"
            className="block text-sm font-medium text-gray-700"
          >
            Mobile
          </label>
          <input
            id="mobile"
            name="mobile"
            type="tel"
            value={user.mobile}
            onChange={handleChange}
            required
            className={inputFieldClass}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
            required
            className={inputFieldClass}
          />
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={user.confirmPassword}
            onChange={handleChange}
            onBlur={checkPasswords}
            required
            className={inputFieldClass}
          />
        </div>
        <div>
          <button
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 "
            onClick={registerUser}
          >
            Register
          </button>
        </div>
      </form>
    </>
  );
};

export default RegisterFormComponent;
