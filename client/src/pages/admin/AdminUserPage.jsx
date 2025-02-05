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
  const [users2, setUsers2] = useState();
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);

  const [userNameSearch, setUserNameSearch] = useState("");
  const [phoneSearch, setPhoneSearch] = useState("");
  const [emailSearch, setEmailSearch] = useState("");

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
    const fetchAllUsers = async () => {
      try {
        const users = await await axios.get("/api/users/getallusers");
        setUsers(users.data);
        setUsers2(users.data);
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
  const filterByUserName = () => {
    const filteredUsers = users2.filter((user) =>
      user.name.toLowerCase().includes(userNameSearch.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  const filterByPhone = () => {
    const filteredUsers = users2.filter((user) =>
      user.mobile.includes(phoneSearch.toLowerCase())
    );
    setUsers(filteredUsers);
  };
  const filterByEmail = () => {
    const filteredUsers = users2.filter((user) =>
      user.email.toLowerCase().includes(emailSearch.toLowerCase())
    );
    setUsers(filteredUsers);
  };
  return (
    <>
      <NavbarAdmin />
      <div>
        <h3 className="text-primary   w-full text-center text-2xl font-thin py-2">
          USER ADMIN PAGE
        </h3>
        <div>
          {loading && <LoadingComponent />}

          <div className="grid grid-rows-1 grid-cols-3 gap-4 border border-primary-300  p-4 my-3 shadow-xl max-w-4xl mx-auto rounded-xl">
            <div className="flex flex-col mx-auto my-auto">
              <input
                placeholder="Search By User Name"
                className="border border-primary-300 p-2 rounded-lg"
                onChange={(e) => setUserNameSearch(e.target.value)}
                onKeyUp={filterByUserName}
              />
            </div>
            <div className="flex flex-col mx-auto my-auto">
              <p>
                <input
                  placeholder="Search By Phone"
                  className="border border-primary-300 p-2 rounded-lg"
                  onChange={(e) => setPhoneSearch(e.target.value)}
                  onKeyUp={filterByPhone}
                />
              </p>
            </div>
            <div className="flex flex-col mx-auto my-auto">
              <p>
                <input
                  placeholder="Search By Email"
                  className="border border-primary-300 p-2 rounded-lg"
                  onChange={(e) => setEmailSearch(e.target.value)}
                  onKeyUp={filterByEmail}
                />
              </p>
            </div>
          </div>

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
                            className=" bg-white text-green-600 m-2 p-2 text-md rounded-lg"
                            onClick={() => updateUser(user._id)}
                          >
                            {user.isAdmin ? null : "MAKE ADMIN"}
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
