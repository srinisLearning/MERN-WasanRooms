import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import NavbarAdmin from "../../components/NavbarAdmin";
//import User from "../../../../server/models/userModel";

const AdminPage = () => {
  /*   useEffect(() => {
    if (User.isAdmin === false) {
      window.location.href = "/home";
    }
  }); */
  return (
    <>
      <h3 className="text-primary   w-full text-center text-3xl font-thin py-2">
        Admin Page
      </h3>
      <NavbarAdmin />
    </>
  );
};

export default AdminPage;
