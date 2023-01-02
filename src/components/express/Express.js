import React, { useEffect, useState } from "react";
import { setNotes, setDeleteNote, setScore } from "../../store/noteSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import "./expressStyle.css";
const speechRecognition =
  window.speechRecognition || window.webkitSpeechRecognition;

const mic = new speechRecognition();
mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

const Express = () => {
  // for measure sentimnet in user text.
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
  const [scoreAnalysis, setScoreAnalysis] = useState(
    sentiment.analyze(scoreAnalysis)
  );

  console.log(scoreAnalysis);

  //Selectors
  //transfer or save the local notes in the redux state.
  const notes = useSelector((state) => state.note.notes);
  const scores = useSelector((state) => state.note.scores);

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
      setScoreAnalysis(sentiment.analyze(transcript));
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
    const score = scoreAnalysis.score;
    await axios.post(`/api/notes`, { note, score });
    const response = await axios.get("/api/notes");
    console.log(response);
    //first save the notes locally, then save them in redux state.
    setSavedNotes([...savedNotes, note]);
    dispatch(setNotes(response.data));
    dispatch(setScore(score));
    console.log(score);

    setNote("");
  };
  console.log(notes);
  console.log(scores);
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
          <h2>Express your feeling and let me help you</h2>
          <p>
            Life can get into the way, and you do not have time to write; still
            you should dedicate some times to at least express your thoughts and
            feelings.
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
                  <p>
                    press start button, express your feeling outloud, then press
                    stop button when complete!!
                  </p>
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
          ""
          // <div className="stop-icon">
          //   <img src="images/stop-button.png" width="5%" alt="" />
          // </div>
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

      {note.length > 0 && (
        <div className="save-note-button">
          <Button onClick={handleSaveNote} disabled={!note}>
            Save Note
          </Button>
        </div>
      )}

      <>
        <TableContainer className="table" component={Paper}>
          <Table
            className="table"
            sx={{ width: "50%" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Your Feelings</TableCell>
                <TableCell>Emotion Status</TableCell>
                <TableCell>Our recommendation</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notes.map((singleNote) => (
                <TableRow
                  key={singleNote.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {new Date().toLocaleString() + ""}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {singleNote.note}
                  </TableCell>
                  <TableCell>
                    {singleNote.score}
                    {singleNote.score > 4 && (
                      <img src="images/smile.png" width="20%" alt="" />
                    )}

                    {singleNote.score < 0 && (
                      <img src="images/sad.png" width="20%" alt="" />
                    )}
                    {singleNote.score >= 0 && singleNote.score < 4 && (
                      <img src="images/meh.png" width="20%" alt="" />
                    )}
                  </TableCell>
                  <TableCell className="recommendations">
                    {singleNote.score > 4 && (
                      <p>Stay Positive, you are doing great</p>
                    )}
                    {singleNote.score >= 0 && singleNote.score < 4 && (
                      <p>
                        It is ok to feel netural, stay strong and positive!!
                      </p>
                    )}
                    {singleNote.score < 0 && (
                      <p>
                        I am sorry that you are feeling this way, would you like
                        to listen to <Link to="/mediate">mediate to music</Link>{" "}
                        or{" "}
                        <Link to="/walk">
                          Find a yoga studio, acupuncture therapist or go for a
                          walk
                        </Link>
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    {" "}
                    <Button
                      id="delete-button"
                      onClick={() => deleteSingleNoteHandler(singleNote.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    </>
  );
};

export default Express;
