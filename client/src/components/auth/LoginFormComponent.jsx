import React, { useState, useEffect } from "react";

import axios from "axios";
import ErrorComponent from "../utils/ErrorComponent";
import LoadingComponent from "../utils/LoadingComponent";

const LoginFormComponent = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      window.location = "/home";
    }
  }, []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const loginUser = async (e) => {
    e.preventDefault();
    if (user.email !== "" && !user.password !== "") {
      console.log(user);
      try {
        setLoading(true);
        const result = await axios.post("/api/users/login", user);
        setLoading(false);
        localStorage.setItem("loggedInUser", JSON.stringify(result.data));
        window.location.href = "/home";
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    } else {
      console.log("Pls enter all the fields");
      setError(true);
    }
  };

  const inputFieldClass =
    "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm";
  return (
    <>
      {loading && <LoadingComponent />}
      {error && <ErrorComponent error=" Invalid Credentials Login Failed" />}

      <form className="mt-8 space-y-6">
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
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 "
            onClick={loginUser}
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginFormComponent;
