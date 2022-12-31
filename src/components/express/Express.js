import React, { useEffect, useState } from "react";
import "./expressStyle.css";
import { setNotes, setDeleteNote } from "../../store/noteSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const speechRecognition =
  window.speechRecognition || window.webkitSpeechRecognition;

const mic = new speechRecognition();
mic.continuous = true;
mic.interimResults = true;

mic.lang = "en-US";
const Express = () => {
  let Sentiment = require("sentiment");
  let sentiment = new Sentiment();

  //Custom Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //local States
  const [isListening, setIsListening] = useState(false);
  //save the notes in the local state first.
  const [note, setNote] = useState([]);
  const [savedNotes, setSavedNotes] = useState([]);
  const [feelingStatus, setFeelingStatus] = useState("");
  const [showOldNotes, setShowOldNotes] = useState(false);

  //Selectors
  //transfer or save the local notes in the redux state.
  const notes = useSelector((state) => state.note.notes);

  useEffect(() => {
    handleListen();
  }, [isListening]);

  // useEffect(() => {
  //   if (notes.length) {
  //     let result = sentiment.analyze(notes);
  //     console.dir(result);
  //   }
  // }, [notes]);

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

  /*
  deleteSingleNoteHandler is a function that takes an id and 
  then delete the note with this id from the redux state */
  const deleteSingleNoteHandler = async (id) => {
    console.log("delete note", id);
    try {
      dispatch(setDeleteNote(id));
      const { data, deleted } = await axios.delete(`/api/notes/${id}`, {});
      navigate("/express");
    } catch (err) {
      console.log(err);
    }
  };

  const updateSingleNoteHandler = async (id) => {
    //write the logic later if I have time.
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
    const response = await axios.get("/api/notes");
    console.log(response);
    //first save the notes locally, then save them in redux state.
    setSavedNotes([...savedNotes, note]);
    dispatch(setNotes(response.data));
    console.log(response.data[0].note);
    console.log(response.data);
    let result = sentiment.analyze(response.data[0].note);
    console.dir(result);
    setNote("");
  };

  return (
    <>
      <div className="express-section">
        <div className="first-image">
          <img
            src="https://i0.wp.com/youthempowerment.com/wp-content/uploads/2019/12/Talk-to-someone-express-yourself.gif?fit=480%2C384&ssl=1"
            alt=""
          />
        </div>
        <div className="express-title-section">
          <h2>Exress your feeling and let me help you</h2>
          <p>
            Life can get into the way, and you do not have time to write; still
            you should dedicate some times to at least express your thoughts and
            feeling.
          </p>
        </div>
      </div>
      <div className="emotions-section ">
        <img
          className="emtions"
          src="images/emotion.png"
          alt="emotion"
          width="25%"
        />
      </div>
      <div className="question-section">
        <Tooltip
          title={
            <>
              <div className="emotion-title">
                <div>
                  <h2>[Express your feeling freely!!]</h2>
                </div>
                <div>
                  <img src="images/emotion.png" alt="emotion" width="25%" />
                </div>
              </div>
            </>
          }
        >
          <div>
            <h2>How do you feel today?</h2>
          </div>
        </Tooltip>
      </div>
      <div className="start-stop-section">
        <Button
          onClick={() => setIsListening((previousState) => !previousState)}
        >
          Start/Stop
        </Button>
      </div>
      <div className="start-stop-icons">
        {isListening ? (
          <div className="speak-icon">
            <img src="images/speak.png" width="5%" alt="" />
          </div>
        ) : (
          <div className="stop-icon">
            <img src="images/stop-button.png" width="5%" alt="" />
          </div>
        )}
      </div>

      <div className="present-speaking-notes">
        <p>{note}</p>
      </div>

      <div className="loading-indicator">
        {isListening && <CircularProgress color="success" />}
      </div>

      <div className="loading-message">
        {isListening && <h3>I am trying to help you, give me few seconds!!</h3>}
      </div>

      <div className="thanks-sharing">
        {note.length > 0 && !isListening && (
          <h5>
            thank you for sharing your feeling with me, let me check your
            feeling!!
          </h5>
        )}
      </div>
      {/* <div className="question-answer-section">
        <div>
          <Tooltip
            title={
              <>
                <div className="emotion-title">
                  <div>
                    <h2>[Express your feeling freely!!]</h2>
                  </div>
                  <div>
                    <img src="images/emotion.png" alt="emotion" width="25%" />
                  </div>
                </div>
              </>
            }
          >
            <div>
              <h2>How do you feel today?</h2>
            </div>
          </Tooltip>
        </div>
        <div>
          {isListening ? (
            <div className="speak">
              <img src="images/speak.png" width="20%" alt="" />
            </div>
          ) : (
            <div className="stop-button">
              <img src="images/stop-button.png" width="10%" alt="" />
            </div>
          )}
        </div>

        <div className="buttons-section">
          <div className="save-note-button">
            <Button onClick={handleSaveNote} disabled={!note}>
              Save Note
            </Button>
          </div>
          <div className="start-stop-button">
            <Button
              onClick={() => setIsListening((previousState) => !previousState)}
            >
              Start/Stop
            </Button>
          </div>
          <div className="old-feeling-button">
            <Button>Old Feelings</Button>
          </div>
        </div>

        <div className="old-notes-section">
          {notes.map((singleNote) => (
            <div key={singleNote.id}>
              <Button onClick={() => deleteSingleNoteHandler(singleNote.id)}>
                Delete
              </Button>
              <Button>Edit</Button>
              <p key={singleNote.id}>{singleNote.note}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="speaking-notes">
        <p className="current-speaking-notes">{note}</p>
      </div> */}
    </>
  );
};

export default Express;
