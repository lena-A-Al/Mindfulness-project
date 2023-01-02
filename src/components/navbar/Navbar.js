import React from "react";
import "./navbarStyle.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="nav">
      <div className="container">
        <div className="site-img">
          <img src="images/mindfulness-3.jpg" alt="website-logo" />
          {/* <h3>MINDFULness</h3> */}
        </div>
        <div className="unoredered-list">
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
              <Link to="walk">Find Facility</Link>
            </li>
            <li>
              <Link to="/give">Give</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
