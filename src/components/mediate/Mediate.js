import React, { useState } from "react";
import ReactAudioPlayer from "react-audio-player";

const Mediate = () => {
  //music
  const [music, setMusic] = useState("music/Beethoven_12_Variation.mp3");
  const handleSongSelect = (event) => {
    setMusic(event.target.value);
  };

  //image
  const [image, setImage] = useState(
    "gifs/7a976d8749e34fad7f34d93a44c42d8a.gif"
  );
  const handleImageSelect = (event) => {
    setImage(event.target.value);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <label>Select Music:</label>
        <select onChange={handleSongSelect} style={{ margin: "20px" }}>
          <option value="music/Beethoven_12_Variation.mp3">Classical</option>
          <option value="music/give-me-new-inspiration-131488.mp3">
            Inspirational
          </option>
          <option value="music/happy-dream-131364.mp3">Happy</option>
          <option value="music/meditation-sounds-122698.mp3">Meditation</option>
          <option value="music/relaxing-music-vol12-131317.mp3">
            Relaxing
          </option>
          <option value="music/slow-motion-121841.mp3">Slow</option>
          <option value="music/spirit-blossom-15285.mp3">Spiritual</option>
        </select>

        <label>Select Image:</label>
        <select onChange={handleImageSelect} style={{ margin: "20px" }}>
          <option value="gifs/7a976d8749e34fad7f34d93a44c42d8a.gif">
            Waves
          </option>
          <option value="gifs/anigif_enhanced-buzz-12246-1421281342-9.gif">
            Clouds
          </option>
          <option value="gifs/anigif_enhanced-buzz-wide-14060-1404757884-8.gif">
            Lake
          </option>
          <option value="gifs/beach-bonfire.gif">Beach</option>
          <option value="gifs/float-animal.gif">Otters</option>
        </select>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ReactAudioPlayer src={music} controls />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "50px",
            margin: "50px",
          }}
        >
          <img src={image} style={{ width: "1100px", height: "auto" }} />
        </div>
      </div>
    </>
  );
};

export default Mediate;
