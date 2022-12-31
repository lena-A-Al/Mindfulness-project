import React, { useState } from "react";
import ReactAudioPlayer from "react-audio-player";

const Mediate = () => {
  const [music, setMusic] = useState("music/Beethoven_12_Variation.mp3");
  console.log(music);
  const handleSongSelect = (event) => {
    setMusic(event.target.value);
  };

  return (
    <>
      <ReactAudioPlayer src={music} controls />

      <select onChange={handleSongSelect}>
        <option value="music/Beethoven_12_Variation.mp3">Music1</option>
        <option value="music/give-me-new-inspiration-131488.mp3">Music2</option>
        <option value="music/happy-dream-131364.mp3">Music3</option>
        <option value="music/meditation-sounds-122698.mp3">Music4</option>
        <option value="music/relaxing-music-vol12-131317.mp3">Music5</option>
        <option value="music/slow-motion-121841.mp3">Music6</option>
        <option value="music/spirit-blossom-15285.mp3">Music7</option>
      </select>
    </>
  );
};

export default Mediate;
