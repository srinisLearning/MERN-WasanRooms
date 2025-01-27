import React from "react";

const RoomModal = ({ show, onClose, room }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center ">
      <div className="bg-white rounded-lg shadow-xl p-6   max-w-screen-xl">
        <h2 className="text-lg   mb-4 text-center text-primary font-extrabold">
          {room.name}
        </h2>

        <div className="grid grid-rows-1 grid-cols-2 gap-4 border border-primary-300  p-4 my-2 shadow-xl max-w-4xl mx-auto">
          <div>
            <img src={room.imageUrl} />
          </div>
          <div className="flex flex-col mx-auto">
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
              <b className="font-extralight">Website: </b>
              {room.website}
            </p>
            <p>
              <b className="font-extralight">Contact Person : </b>
              {room.contactPerson}
            </p>
            <p>
              <b className="font-extralight">Check Out Time: </b>
              {room.checkoutTime}
            </p>
            <hr className="my-2" />
            <b className="font-semibold">Room Rates</b>
            <p>
              <b className="font-extralight">Single Standard Rate </b>
              &#8377; {room.rentPerDay * room.singleStandardFactor}
            </p>
            <p>
              <b className="font-extralight">Double Standard Rate </b>
              &#8377; {room.rentPerDay * room.doubleStandardFactor}
            </p>
            <p>
              <b className="font-extralight">Double Premium Rate </b>
              &#8377; {room.rentPerDay * room.doublePremiumFactor}
            </p>
            <p>
              <b className="font-extralight">Suite Rate </b>
              &#8377; {room.rentPerDay * room.suiteFactor}
            </p>
            <p>
              <b className="font-extralight">Additional Person Rate : </b>
              &#8377; {room.rentPerDay * room.additionalOccupancyFactor}
            </p>
          </div>
        </div>
        <div className="my-4 max-w-4xl mx-auto">
          <p>{room.description}</p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default RoomModal;
