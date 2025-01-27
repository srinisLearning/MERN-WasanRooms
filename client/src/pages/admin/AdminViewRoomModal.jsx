import React from "react";

const AdminViewRoomModal = ({ show, onClose, room }) => {
  if (!show) return null;

  return (
    <>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center ">
        <div className="bg-white rounded-lg shadow-xl p-6   max-w-screen-xl">
          <div className="flex justify-between items-center">
            <div>
              <div class="flex flex-col mx-auto">
                <img
                  src={room.imageUrl}
                  width={300}
                  height={150}
                  className="mx-auto m-2"
                />
                <p className="max-w-lg text-justify text-wrap px-3">
                  <h3 className="semiBold text-center">Description</h3>
                  {room.description}
                </p>
              </div>
            </div>
            <div>
              <table className="max-w-md divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-2 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                      Room Id
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-500">
                      {room._id}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                      Room Name
                    </td>
                    <td className="px-1 py-1 whitespace-nowrap text-sm text-gray-500">
                      {room.name}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                      E-Mail
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-500">
                      {room.email}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                      Phone Number
                    </td>
                    <td className="px-1 py-1 whitespace-nowrap text-sm text-gray-500">
                      {room.phoneNumber}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                      Website
                    </td>
                    <td className="px-1 py-1 whitespace-nowrap text-sm text-gray-500">
                      {room.website}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                      Contact Person
                    </td>
                    <td className="px-1 py-1 whitespace-nowrap text-sm text-gray-500">
                      {room.contactPerson}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                      Check Out Time
                    </td>
                    <td className="px-1 py-1 whitespace-nowrap text-sm text-gray-500">
                      {room.checkOutTime}
                    </td>
                  </tr>

                  <tr>
                    <td className="px-2 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                      <b className="font-semibold m-2 mx-auto">Room Rates</b>
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
                        <b className="font-extralight">
                          Additional Person Rate :{" "}
                        </b>
                        &#8377;{" "}
                        {room.rentPerDay * room.additionalOccupancyFactor}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex m-2 justify-end items-baseline">
            <button
              onClick={onClose}
              className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminViewRoomModal;
