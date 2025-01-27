import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-6 h-screen bg-[url('/images/landing_page_img.png')] bg-cover bg-center bg-no-repeat">
        <h1 className="text-4xl font-bold text-amber-700">
          Welcome to Wasan Rooms
        </h1>
        <h2 className="text-2xl font-bold text-amber-900">
          Perfect Stay, Just a Click Away!
        </h2>
        <Link to="/home" className="bg-primary text-white px-4 py-2 rounded-md">
          Explore Rooms
        </Link>
      </div>
    </>
  );
};

export default LandingPage;
