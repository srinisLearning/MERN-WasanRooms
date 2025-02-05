import React, { useEffect, useState } from "react";
import NavbarAdmin from "../../components/NavbarAdmin";
import axios from "axios";
import Swal from "sweetalert2";
import LoadingComponent from "../../components/utils/LoadingComponent";
import ErrorComponent from "../../components/utils/ErrorComponent";
import { Link } from "react-router-dom";
import AdminViewRoomModal from "./AdminViewRoomModal";
import AdminEditRoomModal from "./AdminEditRoomModal";
import AdminAddRoomModal from "./AdminAddRoomModal";

const AdminBookingsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [rooms2, setRooms2] = useState([]);
  const [room, setRoom] = useState([]);
  //const [editable, setEditable] = useState(false);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [success, setsuccess] = useState(false);
  const [adminViewModalOpen, setAdminViewModalOpen] = useState(false);
  const [adminAddModalOpen, setAdminAddModalOpen] = useState(false);
  const [adminEditModalOpen, setAdminEditModalOpen] = useState(false);

  const [nameSearch, setNameSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
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
        const rooms = await await axios.get("/api/rooms/getAllRooms");
        setRooms(rooms.data);
        setRooms2(rooms.data);
        // console.log(rooms.data);
        setloading(false);
      } catch (error) {
        setloading(false);
        seterror(true);
      }
    };
    fetchBookings();
  }, []);
  const filterByRoomName = () => {
    const filteredRooms = rooms2.filter((room) =>
      room.name.toLowerCase().includes(nameSearch.toLowerCase())
    );
    setRooms(filteredRooms);
  };

  const filterByCity = () => {
    const filteredRooms = rooms2.filter((room) =>
      room.city.toLowerCase().includes(citySearch.toLowerCase())
    );
    setRooms(filteredRooms);
  };

  const deleteRoom = (id) => async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`/api/rooms/deleteRoom/${id}`);
          if (response.data) {
            Swal.fire("Room Deleted", "Room has been deleted", "success");
            setRooms(rooms.filter((room) => room._id !== id));
          }
        } catch (error) {
          Swal.fire("Error", "Room could not be deleted", "error");
        }
      }
    });
  };
  return (
    <>
      <NavbarAdmin />
      <h3 className="text-primary w-full text-center text-2xl font-thin py-2">
        ROOMS ADMIN PAGE
      </h3>
      <div>
        {loading ? (
          <LoadingComponent />
        ) : error ? (
          <ErrorComponent error={error} />
        ) : (
          <>
            <div className="grid grid-rows-1 grid-cols-3 gap-4 border border-primary-300  p-4 my-3 shadow-xl max-w-4xl mx-auto rounded-xl">
              <div className="flex flex-col mx-auto my-auto">
                <input
                  placeholder="Search Room By City"
                  className="border border-primary-300 p-2 rounded-lg"
                  onChange={(e) => setCitySearch(e.target.value)}
                  onKeyUp={filterByCity}
                />
              </div>
              <div className="flex flex-col mx-auto my-auto">
                <p>
                  <input
                    placeholder="Search Room By Name"
                    className="border border-primary-300 p-2 rounded-lg"
                    onChange={(e) => setNameSearch(e.target.value)}
                    onKeyUp={filterByRoomName}
                  />
                </p>
              </div>
              <div className="flex flex-col mx-auto my-auto">
                <Link
                  to=""
                  className="bg-green-500 text-white p-2 rounded-lg px-10"
                  onClick={() => {
                    setAdminAddModalOpen(true);
                  }}
                >
                  ADD ROOM
                </Link>
              </div>
            </div>
            <div className="max-w-6xl mx-auto">
              <table
                cellPadding={15}
                cellSpacing={15}
                className="table table-bordered table-hover text-center mx-auto"
              >
                <thead>
                  <tr className="text-xs">
                    <th>Room Name</th>
                    <th>City </th>
                    <th>Mobile No</th>
                    <th>Email</th>

                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room) => {
                    return (
                      <tr key={room._id} className="text-xs">
                        <td>{room.name}</td>
                        <td>{room.city}</td>
                        <td>{room.phoneNumber}</td>
                        <td>{room.email}</td>

                        <td>
                          <Link
                            className="bg-blue-500 text-white m-2 p-2 rounded-lg"
                            to={` `}
                            onClick={() => {
                              setAdminViewModalOpen(true);
                              setRoom(room);
                              console.log(adminViewModalOpen);
                            }}
                          >
                            VIEW ALL
                          </Link>
                        </td>
                        <td>
                          <Link
                            to=""
                            className="bg-amber-500 text-white p-2 rounded-lg"
                            onClick={() => {
                              setAdminEditModalOpen(true);
                              setRoom(room);
                            }}
                          >
                            EDIT ROOM
                          </Link>
                        </td>

                        <td>
                          <Link
                            className="bg-red-500 text-white m-2 p-2 rounded-lg"
                            to={` `}
                            onClick={deleteRoom(room._id)}
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
      <AdminViewRoomModal
        show={adminViewModalOpen}
        onClose={() => setAdminViewModalOpen(false)}
        room={room}
      />

      {/*   <AdminEditRoomModal
        show={isAdminEditModalOpen}
        onClose={() => setIsAdminEditModalOpen(false)}
        rooms={rooms}
      />
      */}
      <AdminAddRoomModal
        show={adminAddModalOpen}
        onClose={() => {
          setAdminAddModalOpen(false);
        }}
        room={room}
      />
      <AdminEditRoomModal
        show={adminEditModalOpen}
        onClose={() => {
          setAdminEditModalOpen(false);
        }}
        room={room}
      />
    </>
  );
};

export default AdminBookingsPage;
