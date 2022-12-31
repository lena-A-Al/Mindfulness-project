import React from "react";

const Mediate = () => {
  return (
    <>
      <audio controls>
        <source src="music/Beethoven_12_Variation.mp3" />
      </audio>

      <select>
        <option value="1">Music1</option>
        <option value="2">Music2</option>
        <option value="3">Music3</option>
      </select>
    </>
  );
};

export default Mediate;
