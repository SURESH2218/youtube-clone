import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  return isMenuOpen ? (
    <div className="p-5 shadow-lg border flex flex-col gap-3 min-w-52 h-[89.5vh] ">
      <ul className="">
        <Link to="/">
          <li>Home</li>
        </Link>
        <li>Shorts</li>
        <li>Videos</li>
        <li>Live</li>
      </ul>
      <ul>
        <h1 className="font-bold">Subscriptions</h1>
        <li>Music</li>
        <li>Sports</li>
        <li>Gaming</li>
        <li>Moving</li>
      </ul>
      <ul>
        <h1 className="font-bold">Watch Later</h1>
        <li>Music</li>
        <li>Sports</li>
        <li>Gaming</li>
        <li>Moving</li>
      </ul>
    </div>
  ) : null;
};

export default Sidebar;
