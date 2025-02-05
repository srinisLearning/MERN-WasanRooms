import React from "react";
import { Link } from "react-router-dom";
const NavbarAdmin = () => {
  return (
    <>
      <div className="grid grid-rows-1 grid-cols-3 gap-2 border border-primary-300 bg-white p-4 my-3 shadow-xl max-w-xl mx-auto rounded-xl text-center">
        <div>
          <Link to="/admin/rooms">
            <strong className="text-xs text-primary">ROOMS ADMIN</strong>
          </Link>
        </div>
        <div>
          <Link to="/admin/bookings">
            <strong className="text-xs text-primary">BOOKINGS ADMIN</strong>
          </Link>
        </div>
        <div>
          <Link to="/admin/users">
            <strong className="text-xs text-primary">USERS ADMIN</strong>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavbarAdmin;
