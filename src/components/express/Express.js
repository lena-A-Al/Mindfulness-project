import React, { useEffect, useState } from "react";
import "./expressStyle.css";
import { setNotes } from "../../store/noteSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const speechRecognition =
  window.speechRecognition || window.webkitSpeechRecognition;

const mic = new speechRecognition();
mic.continuous = true;
mic.interimResults = true;

mic.lang = "en-US";
const Express = () => {
  //Custom Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //local States
  const [isListening, setIsListening] = useState(false);
  //save the notes in the local state first.
  const [note, setNote] = useState([]);
  const [savedNotes, setSavedNotes] = useState([]);
  console.log(note);
  //Selectors
  //transfer or save the local notes in the redux state.
  const notes = useSelector((state) => state.note.notes);
  console.log(notes);
  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleListen = () => {
    //if is listening is true, start the mic
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      //if not stop the mic
      mic.stop();
      mic.onend = () => {
        console.log("stop");
      };
    }
    mic.onstart = () => {
      console.log("mics on");
    };

    mic.onresult = (event) => {
      console.log("event.results", event.results);
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript);
      setNote(transcript);
      // dispatch(setNotes(transcript));
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  const handleSaveNote = async () => {
    //keep the notes in a varaible.
    // const newNotes = note;

    //call the post api to save notes.
    //update the redux state with the new notes
    await axios.post(`/api/notes`, { note });
    const allNotes = await axios.get("/api/notes");
    // const allSavedNotes = setSavedNotes([...savedNotes, newNotes]);
    // dispatch(setNotes(allSavedNotes));
    // setNote("");
  };

  useEffect(() => {
    handleSaveNote();
  }, [notes]);
  console.log("savedNotes", savedNotes);
  console.log("note", note);
  console.log("notes", notes);
  return (
    <>
      <h1>voice Notes</h1>
      <div className="container">
        <div className="box">
          <h2>Current Note:</h2>
          {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
          <button onClick={handleSaveNote} disabled={!note}>
            Save Note
          </button>
          <button
            onClick={() => setIsListening((previousState) => !previousState)}
          >
            Start/Stop
          </button>
          <p>{note}</p>
        </div>

        <div className="box">
          <h2>Notes</h2>
          {notes && notes?.map((n) => <p key={n}>{n}</p>)}
        </div>
      </div>
    </>
  );
};

export default Express;