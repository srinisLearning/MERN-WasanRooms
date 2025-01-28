import React, { useEffect, useState } from "react";
import NavbarAdmin from "../../components/NavbarAdmin";
import axios from "axios";
import Swal from "sweetalert2";
import LoadingComponent from "../../components/utils/LoadingComponent";
import ErrorComponent from "../../components/utils/ErrorComponent";
import { Link } from "react-router-dom";

const AdminBookingsPage = () => {
  const [bookings, setbookings] = useState([]);
  const [bookings2, setbookings2] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [success, setsuccess] = useState(false);

  const [userNameSearch, setUserNameSearch] = useState("");
  const [roomNameSearch, setRoomNameSearch] = useState("");

  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);
  useEffect(() => {
    if (!user.isAdmin) {
      window.location.href = "/home";
    }
  }, []);
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setloading(true);
        const bookings = await await axios.get("/api/bookings/getallbookings");
        setbookings(bookings.data);
        setbookings2(bookings.data);

        console.log(bookings.data);
        setloading(false);
      } catch (error) {
        setloading(false);
        seterror(true);
      }
    };
    fetchBookings();
  }, []);
  const deleteBooking = (bookingId) => {
    return async () => {
      try {
        await axios.delete(`/api/bookings/deleteBooking/${bookingId}`);
        setbookings(bookings.filter((booking) => booking._id !== bookingId));
        Swal.fire("Deleted!", "Booking has been deleted.", "success");
      } catch (error) {
        console.error(error);
        Swal.fire(
          "Error!",
          "There was an error deleting the booking.",
          "error"
        );
      }
    };
  };
  const filterByUserName = () => {
    const filteredBookings = bookings2.filter((booking) =>
      booking.userName.toLowerCase().includes(userNameSearch.toLowerCase())
    );
    setbookings(filteredBookings);
  };

  const filterByRoomName = () => {
    const filteredBookings = bookings2.filter((booking) =>
      booking.roomName.toLowerCase().includes(roomNameSearch.toLowerCase())
    );
    setbookings(filteredBookings);
  };

  return (
    <>
      <NavbarAdmin />

      <h3 className="text-primary w-full text-center text-3xl font-thin py-2">
        Booking Admin Page
      </h3>

      <div>
        {loading ? (
          <LoadingComponent />
        ) : (
          <>
            <div className="grid grid-rows-1 grid-cols-2 gap-4 border border-primary-300  p-4 my-3 shadow-xl max-w-4xl mx-auto rounded-xl">
              <div className="flex flex-col mx-auto my-auto">
                <input
                  placeholder="Search By User Name"
                  className="border border-primary-300 p-2 rounded-lg"
                  onChange={(e) => setUserNameSearch(e.target.value)}
                  onKeyUp={filterByUserName}
                />
              </div>
              <div className="flex flex-col mx-auto my-auto">
                <p>
                  <input
                    placeholder="Search By Room Name"
                    className="border border-primary-300 p-2 rounded-lg"
                    onChange={(e) => setRoomNameSearch(e.target.value)}
                    onKeyUp={filterByRoomName}
                  />
                </p>
              </div>
            </div>

            <div className="max-w-6xl mx-auto">
              <table
                cellPadding={15}
                cellSpacing={15}
                className="table table-bordered table-hover text-center text-xs mx-auto"
              >
                <thead>
                  <tr>
                    <th>Booking Id</th>
                    <th>User Name </th>
                    <th>Hotel Name</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => {
                    return (
                      <tr key={booking._id}>
                        <td>{booking._id}</td>
                        <td>{booking.userName}</td>
                        <td>{booking.roomName}</td>
                        <td>{booking.fromdate}</td>
                        <td>{booking.todate}</td>
                        <td>{booking.status.toUpperCase()}</td>
                        <td>
                          <Link
                            className="bg-red-500 text-white m-2 p-2 rounded-lg"
                            onClick={deleteBooking(booking._id)}
                          >
                            DELETE
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AdminBookingsPage;
