import React from "react";
import { Link } from "react-router-dom";
import { DatePicker, Space } from "antd";
import StripeCheckout from "react-stripe-checkout";
const { RangePicker } = DatePicker;
import moment from "moment";

import axios from "axios";
import Swal from "sweetalert2";

const BookingPageComponent = ({ room }) => {
  //console.log("From BPc", { room });
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  console.log(user);
  const [loading, setLoading] = React.useState(false);
  const [roomType, setRoomType] = React.useState("Single Occupancy Standard");
  const [dates, setDates] = React.useState("");
  const [additionalOccupancy, setAdditionalOccupancy] = React.useState(0);
  const [costFactor, setCostFactor] = React.useState(1);
  let additionalOccupancyCost = 0;

  console.log(dates);
  let diff = 0;

  diff = Math.floor((dates[1] - dates[0]) / (1000 * 60 * 60 * 24));
  let basicCost = room.rentPerDay;
  if (additionalOccupancy > 0) {
    additionalOccupancyCost = additionalOccupancy * basicCost * 0.3;
  }

  let totalAmountPerDay = basicCost * costFactor;
  let totalAmount = totalAmountPerDay * diff + additionalOccupancyCost * diff;

  const bookRoom = async () => {};
  const onToken = async (token) => {
    const bookingDetails = {
      roomName: room.name,
      roomid: room._id,
      userid: user._id,
      userName: user.name,
      roomType: roomType,
      fromdate: dates[0].format("DD-MM-YYYY"),
      todate: dates[1].format("DD-MM-YYYY"),
      totalDays: diff,
      additionalOccupancy: additionalOccupancy,
      totalAmount: totalAmount,
      transactionId: "",
      token: token,
    };
    //console.log(bookingDetails);
    try {
      setLoading(true);
      const result = axios.post("/api/bookings/bookRoom", bookingDetails);
      setLoading(false);
      Swal.fire(
        "Congrats",
        "Your Room has booked succeessfully",
        "success"
      ).then((result) => {
        window.location.href = "/mybookings";
      });
    } catch (error) {
      setLoading(false);
      // console.log(error);

      Swal.fire("Sorry!!!", "Something went wrong , please try later", "error");
    }

    //console.log(token);
  };

  const rangePickerOnChange = (values) => {
    if (values[0].isBefore(moment(), "day")) {
      console.log("Invalid Date");
      Swal.fire(
        "Sorry!!!",
        "Check In Date should be greater than or equal to Today",
        "error"
      );
      return;
    }
    if (values[0].isAfter(moment().add(60, "days"), "day")) {
      console.log("Invalid Date");
      Swal.fire(
        "Sorry!!!",
        "Check In Date should be within 60 days from Today",
        "error"
      );
      return;
    }

    setDates(values);
  };

  const roomTypeChange = (e) => {
    //  console.log(e.target.value);
    switch (e.target.value) {
      case "1":
        setCostFactor(1);
        setRoomType("Single Occupancy Standard");
        break;
      case "2":
        setCostFactor(1.6);
        setRoomType("Double Occupancy Standard");

        break;
      case "3":
        setCostFactor(2.4);
        setRoomType("Double Occupancy Premium");
        break;
      case "4":
        setCostFactor(4);
        setRoomType("Suite");
        break;
      default:
        setCostFactor(1);
        setRoomType("Single Occupancy Standard");
    }
  };
  return (
    <>
      <div className="grid grid-rows-1 grid-cols-2 gap-4 border border-primary-300  p-4 my-2 shadow-xl max-w-4xl mx-auto rounded-xl">
        <div>
          {/* {room.imageurls.length > 0 && <img src={room.imageurls[0]} />} */}
          <img src={room.imageUrl} />
        </div>

        <div className="flex flex-col mx-auto my-auto">
          <h1 className="text-primary text-xl font-semibold">{room.name}</h1>
          <hr className="my-1" />
          <div className="flex flex-col space-y-2 p-4">
            <div>
              <span className="font-extralight"> Name : </span> {user.name}
            </div>
            <div>
              <span className="font-extralight">Mobile :</span> {user.mobile}{" "}
            </div>

            <div>
              <span className="font-extralight">Email :</span> {user.email}{" "}
            </div>
          </div>
          <div>
            <p className="flex m-3 p-1 items-center">
              RoomType
              <select
                className=" border border-primary max-w-60 mx-2 py-1"
                name="roomType"
                id="roomType"
                onChange={roomTypeChange}
              >
                <option value="1">Single Occupancy | Standard</option>
                <option value="2">Double Occupancy | Standard</option>
                <option value="3">Double Occupancy | Premium</option>
                <option value="4">Suite</option>
              </select>
            </p>
          </div>
          <hr className="my-1" />
          {/*  */}
          <div>
            <Space direction="vertical" size={12}>
              <RangePicker
                className="border border-primary m-2"
                placeholder={["Check In", "Check Out"]}
                onChange={rangePickerOnChange}
              />
            </Space>
          </div>

          {dates && (
            <div>
              <div>
                {roomType !== "Single Occupancy Standard" &&
                  roomType !== "Suite" && (
                    <p className="m-3 p-1 border border-primary max-w-56">
                      Additional Occupancy :{" "}
                      <select
                        className=""
                        name="occupancy"
                        id="occupancy"
                        onChange={(e) => {
                          setAdditionalOccupancy(e.target.value);
                        }}
                      >
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                      </select>
                    </p>
                  )}
              </div>
              <div className="m-3">
                <p>Check In Date : {dates[0].format("DD-MM-YYYY")}</p>
                <p>Check Out Date : {dates[1].format("DD-MM-YYYY")}</p>
                <p>Room Type : {roomType} </p>
                <p>Total No of Nights : {diff}</p>
                <p>
                  {additionalOccupancy > 0
                    ? `Additional Occupancy : ${additionalOccupancy}`
                    : ""}
                </p>
                <hr className="my-3" />
                <p>{/* Basic Cost per Day : {basicCost} */}</p>
                Rate per Day : {totalAmountPerDay}
                <p>
                  Cost for {diff} days : {totalAmountPerDay * diff}
                </p>
                {additionalOccupancy > 0 && (
                  <div>
                    <p>
                      Additional Occupancy Cost Per Day :{" "}
                      {additionalOccupancyCost}
                    </p>
                    <p>
                      Additional Occupancy Cost for {diff} Days :{" "}
                      {additionalOccupancyCost * diff}
                    </p>
                  </div>
                )}
                <hr className="my-3" />
                <p className="text-primary font-extrabold my-3">
                  Total Amount : {totalAmount}
                </p>
              </div>
            </div>
          )}
          {dates && (
            <div>
              <StripeCheckout
                amount={totalAmount * 100}
                currency="INR"
                token={onToken}
                stripeKey="pk_test_51LFsZzSJDYv42pi4MhvAdwPuYV2HTzzDVTklvxuOt4o0le6vyYttWFP3GzTQ99eLi4rC6QYritaKmBXRsxDlXGoc00c5cl8hMc"
              >
                <button className="bg-amber-500 text-white px-4 py-2 rounded-md">
                  Pay Now
                </button>
              </StripeCheckout>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center text-xl text-primary text-center py-3 mx-auto">
        <Link to="/home">Back to Rooms</Link>
      </div>
      )
    </>
  );
};

export default BookingPageComponent;
