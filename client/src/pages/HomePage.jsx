import React, { useEffect, useState } from "react";
import axios from "axios";
import Room from "../components/room/Room";
import LoadingComponent from "../components/utils/LoadingComponent";
import ErrorComponent from "../components/utils/ErrorComponent";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const HomePage = () => {
  const [rooms, setRooms] = useState([]);
  const [rooms2, setRooms2] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameSearch, setNameSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/rooms/getAllRooms")
      .then((response) => {
        //console.log(response.data);
        setRooms(response.data);
        setRooms2(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);
  //console.log(citySearch);
  const filterByRoomName = () => {
    setCitySearch("");
    const filteredRooms = rooms2.filter((room) =>
      room.name.toLowerCase().includes(nameSearch.toLowerCase())
    );
    setRooms(filteredRooms);
  };

  const filterByCity = () => {
    setNameSearch("");
    const filteredRooms = rooms2.filter((room) =>
      room.city.toLowerCase().includes(citySearch.toLowerCase())
    );
    setRooms(filteredRooms);
  };

  return (
    <>
      <img src="/images/hotel_banner_3.png" className="w-full h-96" />
      <h3 className="bg-primary w-full text-white text-center text-3xl font-thin py-2">
        Room List
      </h3>
      {loading ? (
        <div>
          <LoadingComponent />
        </div>
      ) : (
        <>
          <div className="grid grid-rows-1 grid-cols-2 gap-4 border border-primary-300  p-4 my-3 shadow-xl max-w-4xl mx-auto rounded-xl">
            <div className="flex flex-col mx-auto my-auto">
              <input
                placeholder="Search Room By City"
                className="border border-primary-300 p-2 rounded-lg"
                onChange={(e) => setCitySearch(e.target.value)}
                onKeyUp={filterByCity}
                value={citySearch}
              />
            </div>
            <div className="flex flex-col mx-auto my-auto">
              <p>
                <input
                  placeholder="Search Room By Name"
                  className="border border-primary-300 p-2 rounded-lg"
                  onChange={(e) => setNameSearch(e.target.value)}
                  onKeyUp={filterByRoomName}
                  value={nameSearch}
                />
              </p>
            </div>
          </div>
          {rooms.map((room) => (
            <div className="" key={room._id}>
              <Room room={room} />
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default HomePage;
