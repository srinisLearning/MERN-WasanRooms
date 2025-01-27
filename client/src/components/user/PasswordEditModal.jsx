import React, { useState } from "react";
import axios from "axios";
import SWAL from "sweetalert2";

const PasswordEditModal = () => {
  const [newPassword, setNewPassword] = useState("");

  const handlePasswordChange = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      const result = await axios.post("/api/users/changepassword", {
        password: newPassword,
        userid: user._id,
      });
      console.log(result.data);
      SWAL.fire({
        title: "Password Changed Successfully",
        icon: "success",
      }).then(() => {
        logout();
      });
    } catch (error) {
      console.log(error);
    }
  };
  function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "/login";
  }

  return (
    <>
      {" "}
      <div className="">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-3xl">
          <h3 className="text-primary w-full text-center text-xl font-thin py-2">
            Change Password
          </h3>

          <input
            type="text"
            required
            placeholder="Enter New Password"
            className="border border-primary-300 p-2 my-2 w-full"
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
          <button
            className="flex justify-center items-center bg-amber-500 p-2 text-white  rounded-lg"
            onClick={handlePasswordChange}
          >
            Change Password
          </button>
        </div>
      </div>
    </>
  );
};

export default PasswordEditModal;
