import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import LoadingComponent from "../utils/LoadingComponent";

const MyBookingsComponent = () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const [mybookings, setMyBookings] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const result = await axios.get(
          `/api/bookings/getBookingsById/${user._id}`
        );
        // console.log(result.data);
        setMyBookings(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookings();
  }, []);
  const confirmCancelBooking = (bookingId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this room booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        cancelBooking(bookingId);
      } else {
        window.location.href = "/mybookings";
      }
    });
  };

  async function cancelBooking(bookingId) {
    try {
      setloading(true);
      const result = await axios.post("/api/bookings/cancelbooking", {
        bookingid: bookingId,
      });
      setloading(false);
      Swal.fire(
        "Congrats",
        "Your Room has cancelled succeessfully",
        "success"
      ).then((result) => {
        window.location.href = "/mybookings";
      });
    } catch (error) {
      Swal.fire("Oops", "Something went wrong", "error").then((result) => {
        window.location.href = "/mybookings";
      });
      setloading(false);
    }
  }

  return (
    <>
      <h3 className="text-primary w-full text-center text-3xl font-thin py-2">
        My Bookings
      </h3>
      <div className="mx-auto">
        <div className="grid grid-cols-2 max-w-4xl mx-auto">
          {mybookings.map((booking) => (
            <div className="m-4" key={booking._id}>
              <div className="bg-white shadow-md border border-primary rounded-lg p-4">
                <h5 className="text-xl font-semibold mb-2">
                  {booking.roomName}
                </h5>
                <p className="text-gray-700">
                  Booking ID: {booking.transactionId}
                </p>
                <p className="text-gray-700">From Date: {booking.fromdate}</p>
                <p className="text-gray-700">To Date: {booking.todate}</p>
                <p className="text-gray-700">Room Type: {booking.roomType}</p>
                <p className="text-gray-700">Total Days: {booking.totalDays}</p>
                <p className="text-gray-700">
                  Total Amount: {booking.totalAmount}
                </p>
                <p
                  className={`m-3 max-w-xs text-center ${
                    booking.status === "booked"
                      ? "bg-primary text-white p-2"
                      : "bg-red-600 text-white p-2"
                  }`}
                >
                  {booking.status === "booked" ? (
                    <span>BOOKED</span>
                  ) : (
                    <span>CANCELLED</span>
                  )}
                </p>
                {booking.status === "booked" && (
                  <div className="text-right mt-2">
                    <button
                      className="btn bg-amber-600 text-white boder-solid border-amber-600 p-1 rounded-lg text-xs"
                      onClick={() => confirmCancelBooking(booking._id)}
                    >
                      Cancel Booking
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyBookingsComponent;
