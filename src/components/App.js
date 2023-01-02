import React, { useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";
import CreateUser from "./CreateUser";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Navbar from "./navbar/Navbar";
import Express from "./express/Express";
import Mediate from "./mediate/Mediate";
import Walk from "./walk/Walk";
import Give from "./give/Give";
import Home from "./home/Home";
import "./appStyle.css";
/**
 * This is the entry point for all of our react stuff
 */
const App = () => {
  //Customs Hooks:
  const dispatch = useDispatch();
  //Selectors:
  const { user } = useSelector((state) => state.user);

  const loginWithToken = async () => {
    //get token from the localStorage
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/auth", {
        headers: {
          authorization: token,
        },
      });
      dispatch(setUser(response.data));
    }
  };

  useEffect(() => {
    loginWithToken();
  }, []);

  // if the user not log in, redirect them to the log in page to log in inot the website.
  if (!user.id) return <Login />;
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/createuser" element={<CreateUser />}></Route>
        <Route path="/express" element={<Express />}></Route>
        <Route path="/mediate" element={<Mediate />}></Route>
        <Route path="/walk" element={<Walk />}></Route>
        <Route path="/give" element={<Give />}></Route>
      </Routes>
    </>
  );
};

export default App;
