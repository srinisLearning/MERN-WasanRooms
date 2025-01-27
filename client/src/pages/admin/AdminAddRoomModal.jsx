import React from "react";
import { useState } from "react";
import axios from "axios";
import SWAL from "sweetalert2";
const AdminAddRoomModal = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    imageUrl: "",
    phoneNumber: 0,
    email: "",
    website: "",
    contactPerson: "",
    rentPerDay: 0,
    singleStandardFactor: 0,
    doubleStandardFactor: 0,
    doublePremiumFactor: 0,
    suiteFactor: 0,
    checkOutTime: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleCheckOutTimeChange = (e) => {
    setFormData({ ...formData, checkOutTime: e.target.value });
    console.log(formData.checkOutTime);
  };

  console.log(FormData.checkOutTime);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      console.log(formData);
      const response = await axios.post("/api/rooms/addRoom", formData);
      console.log(response);
      SWAL.fire({
        title: "Room Added",
        text: "Room Added Successfully",
        icon: "success",
        timer: 2000,
      }).then(() => {
        document.location.reload();
      });
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  if (!show) return null;

  const fieldClassStyle =
    "w-full  border border-1 border-primary p-1 mx-2 rounded-lg text-xs";
  const labelClassStyle = "text-xs text-primary-500 mx-2";
  //console.log("Editable", editable);

  return (
    <>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-screen-xl">
          <h3 className="text-primary text-center font-bold text-xl my-2">
            ADD ROOM
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="flex  justify-between gap-6 items-center border-b-2 border-primary-200">
              <div className="flex flex-col gap-2">
                {" "}
                {/* Left side beginning */}
                <div>
                  <label htmlFor="name" className={labelClassStyle}>
                    Room Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Room Name"
                    onChange={handleChange}
                    className={fieldClassStyle}
                    value={formData.name}
                  />
                </div>
                <div>
                  <label htmlFor="city" className={labelClassStyle}>
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    onChange={handleChange}
                    className={fieldClassStyle}
                    value={formData.city}
                  />
                </div>
                <div>
                  <label htmlFor="imageUrl" className={labelClassStyle}>
                    Image URL
                  </label>

                  <input
                    type="text"
                    name="imageUrl"
                    placeholder="Image URL"
                    onChange={handleChange}
                    className={fieldClassStyle}
                    value={formData.imageUrl}
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className={labelClassStyle}>
                    Phone Number
                  </label>
                  <input
                    type="number"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    onChange={handleChange}
                    className={fieldClassStyle}
                    value={formData.phoneNumber}
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClassStyle}>
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className={fieldClassStyle}
                    value={formData.email}
                  />
                </div>
                <div>
                  <label htmlFor="website" className={labelClassStyle}>
                    Website
                  </label>
                  <input
                    type="text"
                    name="website"
                    placeholder="Website"
                    onChange={handleChange}
                    className={fieldClassStyle}
                    value={formData.website}
                  />
                </div>
                <div>
                  <label htmlFor="contactPerson" className={labelClassStyle}>
                    Contact Person
                  </label>

                  <input
                    type="text"
                    name="contactPerson"
                    placeholder="Contact Person"
                    onChange={handleChange}
                    className={fieldClassStyle}
                    value={formData.contactPerson}
                  />
                </div>
              </div>{" "}
              {/* End of left side */}
              <div className="flex flex-col gap-2 items-start justify-start">
                {" "}
                {/* Right side */}
                <div>
                  <label htmlFor="rentPerDay" className={labelClassStyle}>
                    Rent Per Day [Basic Cost]
                  </label>
                  <input
                    type="number"
                    name="rentPerDay"
                    placeholder="Rent Per Day"
                    onChange={handleChange}
                    className={fieldClassStyle}
                    value={formData.rentPerDay}
                  />
                </div>
                <div>
                  <label
                    htmlFor="singleStandardFactor"
                    className={labelClassStyle}
                  >
                    Single Standard Factor
                  </label>
                  <input
                    type="number"
                    name="singleStandardFactor"
                    placeholder="Single Standard Factor"
                    onChange={handleChange}
                    className={fieldClassStyle}
                    value={formData.singleStandardFactor}
                  />
                </div>
                <div>
                  <label
                    htmlFor="doubleStandardFactor"
                    className={labelClassStyle}
                  >
                    Double Standard Factor
                  </label>

                  <input
                    type="number"
                    name="doubleStandardFactor"
                    placeholder="Double Standard Factor"
                    onChange={handleChange}
                    className={fieldClassStyle}
                    value={formData.doubleStandardFactor}
                  />
                </div>
                <div>
                  <label
                    htmlFor="doublePremiumFactor"
                    className={labelClassStyle}
                  >
                    Double Premium Factor
                  </label>
                  <input
                    type="number"
                    name="doublePremiumFactor"
                    placeholder="Double Premium Factor"
                    onChange={handleChange}
                    className={fieldClassStyle}
                    value={formData.doublePremiumFactor}
                  />
                </div>
                <div>
                  <label htmlFor="suiteFactor" className={labelClassStyle}>
                    Suite Factor
                  </label>
                  <input
                    type="number"
                    name="suiteFactor"
                    placeholder="Suite Factor"
                    onChange={handleChange}
                    className={fieldClassStyle}
                    value={formData.suiteFactor}
                  />
                </div>
                <div>
                  <label
                    htmlFor="additionalOccupancyFactor"
                    className={labelClassStyle}
                  >
                    Additional Occupancy Factor
                  </label>
                  <input
                    type="number"
                    max={1}
                    min={0}
                    step="0.01"
                    name="additionalOccupancyFactor"
                    placeholder="Additional Occupancy Factor"
                    onChange={handleChange}
                    className={fieldClassStyle}
                    value={formData.additionalOccupancyFactor}
                  />
                </div>
                <div>
                  <label htmlFor="checkOutTime" className={labelClassStyle}>
                    Check Out Time
                  </label>

                  <select
                    className=" border border-primary max-w-60 mx-1 py-1 text-xs"
                    name="checkOutTime"
                    id="checkOutTime"
                    value={formData.checkOutTime}
                    onChange={handleCheckOutTimeChange}
                  >
                    <option value="24 HRS">24 HRS</option>
                    <option value="12 NOON">12 NOON</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="m-2">
              <label htmlFor="description" className={labelClassStyle}>
                Description
              </label>
              <textarea
                type="textarea"
                name="description"
                placeholder="Description"
                className={fieldClassStyle}
                onChange={handleChange}
                rows="4"
                cols="50"
                value={formData.description}
              ></textarea>
            </div>
            <div className="flex m-2 justify-end items-baseline">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2  rounded h-8 px-4 m-2"
              >
                ADD ROOM
              </button>
            </div>
          </form>
          <div className="flex m-2 justify-end items-baseline">
            <button
              type="button"
              onClick={onClose}
              className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 h-12 rounded ml-2"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAddRoomModal;
