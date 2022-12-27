import React, { useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";
import CreateUser from "./CreateUser";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

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
      <h1>Welcome to my solor project {user.username}</h1>
      <div>
        <Link to="">Home</Link>
        <Link to="login">Login</Link>
        <Link to="logout">Logout</Link>
        <Link to="createuser">Create User</Link>
      </div>
      <Routes>
        <Route path="/" element={<h3>Welcome to home page</h3>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/createuser" element={<CreateUser />}></Route>
      </Routes>
    </>
  );
};

export default App;
