import React, { useEffect, useState } from "react";
import "./expressStyle.css";
import { setNotes, setDeleteNote } from "../../store/noteSlice.js";
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

  //Selectors
  //transfer or save the local notes in the redux state.
  const notes = useSelector((state) => state.note.notes);

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
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };
  const fetchSingleNote = async (id) => {
    dispatch(setDeleteNote(id));
    const { data, deleted } = await axios.delete(`/api/notes/${id}`, {});
    navigate("/notes");
  };
  /* handleSaveNote  is a function that takes no paramter. 
  It calls the axios post method and send the new note to be saved in the database. 
  It update savedNotes with the new notes the user adds. 
  It updates the redus states with the new note. 
  It sets setNote to empty string at the end. 
   */
  const handleSaveNote = async () => {
    //call the post api to save notes.
    await axios.post(`/api/notes`, { note });
    //first save the notes locally, then save them in redux state.
    setSavedNotes([...savedNotes, note]);
    dispatch(setNotes([...savedNotes, note]));
    setNote("");
  };

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
          {notes.map((n) => (
            <>
              <button onClick={() => fetchSingleNote(n.id)}>Delete</button>
              <button>Edit</button>
              <p key={n}>
                {n}, {n.id}
              </p>
              <p key={n}>{n.id}</p>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Express;
