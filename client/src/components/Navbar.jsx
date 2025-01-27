import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "/login";
  }
  return (
    <>
      <div className="flex justify-around bg-primary text-white min-h-16 items-center">
        <div className="flex flex-col">
          <h3 className="text-3xl font-extrabold text-white">
            <Link to="/home">Wasan Rooms</Link>
          </h3>
          <span className="text-white text-center text-md">
            Your Perfect Stay, Just a Click Away!
          </span>
        </div>
        <div className="flex flex-row">
          {user ? (
            <>
              <div className="px-4 py-2 mr-3 font-semibold text-violet-800">
                {" "}
                Welcome, {user.name.toUpperCase()}
              </div>
              <div className="px-4 py-2 text-stone-950">
                {user.isAdmin && <a href="/admin/rooms">ADMIN PAGE</a>}
              </div>
              <div className="px-4 py-2">
                <a href="/mybookings">MY BOOKINGS</a>
              </div>
              <div className="px-4 py-2">
                <a href="/profile">MY PROFILE</a>
              </div>
              <div className="px-4 py-2">
                <button onClick={logout}>LOGOUT</button>
              </div>
            </>
          ) : (
            <>
              <div className="px-4 py-2">
                <a href="/login">LOGIN</a>
              </div>
              <div className="px-4 py-2">
                <a href="/register">REGISTER</a>
              </div>
            </>
          )}
        </div>
        {/* end of column */}
      </div>{" "}
      {/*end of row */}
    </>
  );
};

export default Navbar;
