import React, { useState } from "react";
import RoomModal from "./RoomModal";
import { Link } from "react-router-dom";

const Room = ({ room }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const [nameSearch, setNameSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  return (
    <>
      <div className="grid grid-rows-1 grid-cols-2 gap-4 border border-primary-300  p-4 my-11 shadow-xl max-w-3xl mx-auto rounded-xl">
        <div>
          <img src={room.imageUrl} />
        </div>
        <div className="flex flex-col mx-auto my-auto">
          <h1 className="text-primary text-xl font-semibold">{room.name}</h1>
          <p>
            <b className="font-extralight">City : </b>
            {room.city}
          </p>
          <p>
            <b className="font-extralight">Contact Number : </b>
            {room.phoneNumber}
          </p>
          <p>
            <b className="font-extralight">E-Mail : </b>
            {room.email}
          </p>
          <p>
            <b className="font-extralight">Website : </b>
            {room.website}
          </p>

          <div className="flex space-x-6 p-4">
            {user && (
              <Link
                to={`/book/${room._id}`}
                className="bg-amber-500 text-white px-4 py-2 rounded-md"
              >
                <button>Book Now</button>
              </Link>
            )}

            <button
              className="bg-amber-800 text-white px-4 py-2 rounded-md"
              onClick={() => setIsModalOpen(true)}
            >
              All Details
            </button>
          </div>
        </div>
      </div>
      <RoomModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        room={room}
      />
    </>
  );
};

export default Room;
