import React from "react";
import { Link } from "react-router-dom";
const NavbarAdmin = () => {
  return (
    <>
      <div className="grid grid-rows-1 grid-cols-3 gap-2 border border-primary-300  p-4 my-3 shadow-xl max-w-xl mx-auto rounded-xl text-center">
        <div>
          <Link to="/admin/rooms">Rooms</Link>
        </div>
        <div>
          <Link to="/admin/bookings">Bookings</Link>
        </div>
        <div>
          <Link to="/admin/users">Users</Link>
        </div>
      </div>
    </>
  );
};

export default NavbarAdmin;
