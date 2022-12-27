import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  //Custom Hooks:
  const navigate = useNavigate();
  //local States:
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
  });

  //Handler functions
  const onChange = (event) => {
    console.log(event.target.name);
    console.log(event.target.value);
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post("/api/users", {
      username: credentials.username,
      password: credentials.password,
      email: credentials.email,
    });
    navigate("/login");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          value={credentials.username}
          name="username"
          onChange={onChange}
        />
        <label>Password:</label>
        <input
          type="text"
          value={credentials.password}
          name="password"
          onChange={onChange}
        />
        <label>Email:</label>
        <input
          type="text"
          value={credentials.email}
          name="email"
          onChange={onChange}
        />
        <button type={"submit"}>Submit</button>
      </form>
    </>
  );
};

export default CreateUser;
