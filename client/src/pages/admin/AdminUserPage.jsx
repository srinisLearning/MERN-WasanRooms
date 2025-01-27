import React from "react";
import NavbarAdmin from "../../components/NavbarAdmin";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import LoadingComponent from "../../components/utils/LoadingComponent";
import ErrorComponent from "../../components/utils/ErrorComponent";
import { Link } from "react-router-dom";

const AdminUserPage = () => {
  const [users, setUsers] = useState();
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const users = await await axios.get("/api/users/getallusers");
        setUsers(users.data);
        console.log(users.data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
      }
    };
    fetchAllUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/api/users/deleteUser/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
      Swal.fire("Deleted!", "User has been deleted.", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "There was an error deleting the user.", "error");
    }
  };
  const updateUser = async (userId) => {
    try {
      await axios.put(`/api/users/updateUser/${userId}`);
      //setUsers(users.filter((user) => user._id !== userId));
      Swal.fire("Updated!", "User has been made admin.", "success").then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "There was an error deleting the user.", "error");
    }
  };
  return (
    <>
      <NavbarAdmin />
      <div>
        <h3 className="text-primary   w-full text-center text-3xl font-thin py-2">
          User Admin Page
        </h3>
        <div>
          {loading && <LoadingComponent />}

          <div className="max-w-6xl mx-auto text-xs">
            <table
              cellPadding={15}
              cellSpacing={15}
              className="table table-bordered table-hover text-center mx-auto"
            >
              <thead className="">
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Role</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {users &&
                  users.map((user) => {
                    return (
                      <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.mobile}</td>
                        <td>{user.isAdmin ? "ADMIN" : "USER"}</td>
                        <td>
                          <Link
                            className="bg-red-500 text-white m-2 p-2 rounded-lg"
                            onClick={() => handleDelete(user._id)}
                          >
                            DELETE
                          </Link>
                        </td>
                        <td>
                          <Link
                            className="bg-green-500 text-white m-2 p-2 rounded-lg"
                            onClick={() => updateUser(user._id)}
                          >
                            {user.isAdmin ? "" : "MAKE ADMIN"}
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUserPage;
