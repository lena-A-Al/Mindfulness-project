import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../store/userSlice";
import CreateUser from "./CreateUser";
import "./loginStyle.css";
import { Box, Button, TextField, Typography } from "@mui/material";

const Login = () => {
  //Customs Hooks:
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Local State:
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [createUser, setCreateUser] = useState(false);

  //Selectors:

  // Handler Functions:
  //onChnage function takes event and save what the user writes in the input in local states.
  const onChange = (event) => {
    console.log(event.target.name);
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

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
  if (createUser)
    return (
      <Link to="/createuser">
        <CreateUser />
      </Link>
    );

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post("/api/auth", credentials);
    const token = response.data;
    window.localStorage.setItem("token", token);
    loginWithToken(token);
  };
  return (
    <div className="login-page">
      <div className="image-section">
        <img src="images/login-page.jpg" alt="login-page-image" />
      </div>

      <div className="form-section">
        <form onSubmit={handleLoginSubmit}>
          <div className="website-name">
            <h1 className="website-name">Hello</h1>
          </div>{" "}
          <Box
            display="flex"
            flexDirection={"column"}
            alignItems="center"
            justifyContent={"center"}
            margin="auto"
            borderRadius={5}
            sx={{
              ":hover": {
                boxShadow: "10px 10px 20px #ccc",
              },
            }}
          >
            <TextField
              margin="normal"
              type={"text"}
              variant="outlined"
              placeholder="username"
              name="username"
              value={credentials.username}
              onChange={onChange}
            ></TextField>
            <TextField
              margin="normal"
              type={"password"}
              variant="outlined"
              placeholder="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            ></TextField>
            <Button
              type="submit"
              sx={{ marginTop: 5, borderRadius: 3 }}
              variant="contained"
              color="warning"
            >
              Login
            </Button>
            <Button
              type="submit"
              sx={{ marginTop: 5, borderRadius: 3 }}
              variant="contained"
              onClick={() => setCreateUser(!createUser)}
            >
              Create a new account
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default Login;
