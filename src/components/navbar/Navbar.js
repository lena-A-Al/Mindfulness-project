import React from "react";
import "./navbarStyle.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="nav">
      <div className="site-title">
        {/* <img src="images/calm·ness-logos.jpeg" alt="website-logo" width="40%" /> */}
        <h3>MINDFULness</h3>
      </div>
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
