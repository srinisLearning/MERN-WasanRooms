import React, { useState } from "react";
import axios from "axios";
import SWAL from "sweetalert2";

const PhoneEditModal = () => {
  const [newPhone, setNewPhone] = useState("");
  const handlePhoneChange = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      console.log(user);
      const result = await axios.post("/api/users/changephone", {
        phone: newPhone,
        userid: user._id,
      });
      console.log(result.data);
      user.mobile = newPhone;
      SWAL.fire({
        title: "Phone Number Changed Successfully",
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
        <div className="bg-white rounded-lg shadow-xl p-6 min-w--3xl">
          <h3 className="text-primary w-full text-center text-lg font-thin py-2">
            Change Phone Number
          </h3>
          <input
            type="text"
            required
            placeholder="Enter New Phone Number"
            className="border border-primary-300 p-2 my-2 w-full"
            onChange={(e) => {
              setNewPhone(e.target.value);
            }}
          />
          <button
            className="flex justify-center items-center bg-amber-500 p-2 text-white  rounded-lg"
            onClick={handlePhoneChange}
            disabled={newPhone.length < 10}
          >
            Change Phone Number
          </button>
        </div>
      </div>
    </>
  );
};

export default PhoneEditModal;
