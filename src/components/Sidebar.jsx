import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  return isMenuOpen ? (
    <div className="p-5 shadow-lg border flex flex-col gap-3 min-w-52 h-[89.5vh]">
      {/* Navigation Section */}
      <section>
        <ul className="">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Shorts</li>
          <li>Videos</li>
          <li>Live</li>
        </ul>
      </section>

      {/* Subscriptions Section */}
      <section>
        <h2 className="font-bold">Subscriptions</h2>
        <ul>
          <li>Music</li>
          <li>Sports</li>
          <li>Gaming</li>
          <li>Movies</li>
        </ul>
      </section>

      {/* Watch Later Section */}
      <section>
        <h2 className="font-bold">Watch Later</h2>
        <ul>
          <li>Music</li>
          <li>Sports</li>
          <li>Gaming</li>
          <li>Movies</li>
        </ul>
      </section>
    </div>
  ) : null;
};

export default Sidebar;
