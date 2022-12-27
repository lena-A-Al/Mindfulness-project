import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/userSlice";

const Logout = () => {
  //Custom Hooks:
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Handler functions
  const logout = () => {
    //remopve token from the localstorage
    window.localStorage.removeItem("token");
    //reset user to nothing
    dispatch(setUser(""));
    navigate("/");
  };
  return (
    <>
      <button onClick={() => logout()}>Logout</button>
    </>
  );
};

export default Logout;
