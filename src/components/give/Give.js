import React from "react";
import "./giveStyle.css";
const Give = () => {
  return (
    <div className="give-section">
      <div className="give-item">
        <div className="item-img">
          <img className="animals" src="images/animals.jpg" alt="" />
          <div className="image-layout"></div>
        </div>
        <div className="title-info">
          <h2>Volunteer to help animals</h2>
          <p>
            The Humane Society of the United States, and its family of
            organizations, embraces volunteers as essential partners in our
            lifesaving work. We engage volunteers in supporting staff at every
            level to amplify our efforts to create a more humane society.
            <a href="https://www.humanesociety.org/volunteer">Learn More</a>
          </p>
        </div>
      </div>

      <div className="give-item">
        <div className="item-img">
          <img
            className="yoga"
            src="images/reunify-yoga-ocean-beach-yoga-studio.png"
            alt=""
          />
          <div className="image-layout"></div>
        </div>
        <div className="title-info">
          <h2>Become an Empowered Minds Volunteer</h2>
          <p>
            Our volunteers actively utilize yoga and mindfulness in their daily
            lives, enjoy working with children and have a passion to support
            their community.
          </p>
          <a href="https://www.empoweredminds.org/volunteer">Learn More</a>
        </div>
      </div>
    </div>
  );
};

export default Give;
