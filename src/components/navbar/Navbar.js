import React from "react";
import "./navbarStyle.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="nav">
      <a className="site-title">Site name</a>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/express">Expresss YourSelf</Link>
        </li>
        <li>
          <Link to="/mediate">Mediate</Link>
        </li>
        <li>
          <Link to="walk">Walk</Link>
        </li>
        <li>
          <Link to="/give">Give</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
