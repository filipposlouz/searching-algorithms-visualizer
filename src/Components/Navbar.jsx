import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/dijkstra">Dijkstra</Link>
      </li>
      <li>
        <Link to="/astar">A* Search</Link>
      </li>
    </ul>
  );
};

export default Navbar;
