import React from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const LandingPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-6 h-screen bg-[url('/images/landing_page_img.png')] bg-cover bg-center bg-no-repeat">
        <h1
          className="text-4xl font-bold text-lime-700"
          data-aos="zoom-in"
          data-aos-duration="2000"
        >
          Welcome to Wasan Rooms
        </h1>
        <h2
          className="text-2xl font-bold text-lime-900"
          data-aos="zoom-in"
          data-aos-duration="3000"
        >
          Perfect Stay, Just a Click Away!
        </h2>
        <Link
          to="/home"
          className="bg-primary text-white px-4 py-2 rounded-md"
          data-aos="fade-in"
          data-aos-duration="4000"
        >
          Explore Rooms
        </Link>
      </div>
    </>
  );
};

export default LandingPage;
