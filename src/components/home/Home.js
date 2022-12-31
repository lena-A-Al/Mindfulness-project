import React from "react";
import "./homeStyle.css";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MessageIcon from "@mui/icons-material/Message";

const Home = () => {
  return (
    <div className="main-page-color">
      <div className="home-section">
        <div className="left-section">
          <p>
            The quality of your life – or in other words, your levels of
            happiness – can be greatly influenced by practising mindful
            awareness on a regular basis. You don’t need to be in a crisis or
            staring down the barrel of one of life’s big dilemmas; simply try to
            bring a mindful approach into your everyday life as often as
            possible, and you’ll begin to get better at having a cool head when
            you really need it. This will make you better equipped to deal with
            the challenges, demands and pressures of modern life.
          </p>
        </div>
        <div className="right-section">
          {/* <img src="images/mediate-home-page.jpg" alt="" /> */}
          <img
            src="https://i.insider.com/609d3f556a3ce80019e043da?width=1300&format=jpeg&auto=webp"
            alt=""
          />
        </div>
      </div>
      <div class="container"></div>

      <footer>
        <section class="ft-social">
          <ul class="ft-social-list">
            <li>
              <FacebookIcon />
            </li>
            <li>
              <InstagramIcon />
            </li>
            <li>
              <TwitterIcon />
            </li>
            <li>
              <LinkedInIcon />
            </li>
            <li>
              <MessageIcon />
            </li>
          </ul>
        </section>
      </footer>
    </div>
  );
};

export default Home;
