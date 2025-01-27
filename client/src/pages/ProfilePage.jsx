import React from "react";
import PasswordEditModal from "../components/user/PasswordEditModal";
import PhoneEditModal from "../components/user/PhoneEditModal";

const ProfilePage = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const user = loggedInUser;
  console.log(user);
  return (
    <>
      <h3 className="text-primary w-full text-center text-3xl font-thin py-2">
        Profile Page
      </h3>
      <div class="flex flex-col justify-center mx-auto max-w-lg gap-6">
        <div className="flex flex-row gap-3 border border-primary-300  p-4 my-2 shadow-xl max-w-4xl mx-auto rounded-xl text-xs">
          <div>
            {" "}
            <span className="font-extralight">Name :</span>{" "}
            <span className="text-primary font-extrabold"> {user.name}</span>
          </div>
          <div>
            <span className="font-extralight"> E-Mail : </span>
            <span className="text-primary font-extrabold">{user.email}</span>
          </div>
          <div>
            {" "}
            <span className="font-extralight">Mobile :</span>
            <span className="text-primary font-extrabold"> {user.mobile}</span>
          </div>
          <div>
            <span className="font-extralight">User Status : </span>
            <span className="text-primary font-extrabold">
              {user.isAdmin ? "Admin" : "User"}
            </span>
          </div>
        </div>
        <div className="flex flex-row gap-3 border border-primary-300  p-4 my-2 shadow-xl max-w-4xl mx-auto rounded-xl text-xs">
          <div>
            <PasswordEditModal />
          </div>

          <div>
            <PhoneEditModal />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
