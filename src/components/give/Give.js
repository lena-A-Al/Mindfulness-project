import React from "react";
import "./giveStyle.css";
const Give = () => {
  return (
    <div className="give-section">
      <div className="give-item">
        <div className="item-img">
          <img
            className="yoga"
            src="images/kenan-kitchen-LRu2JPt1yD0-unsplash.jpg"
            alt=""
          />
          <div className="image-layout"></div>
        </div>
        <div className="title-info">
          <h2>Volunteer to help animals</h2>
          <p>
            The Humane Society of the United States, and its family of
            organizations, embraces volunteers as essential partners in our
            lifesaving work.
          </p>
          <a href="https://www.humanesociety.org/volunteer">Learn More</a>
        </div>
      </div>

      <div className="give-item">
        <div className="item-img">
          <img
            className="yoga"
            src="images/robert-collins-tvc5imO5pXk-unsplash.jpg"
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
