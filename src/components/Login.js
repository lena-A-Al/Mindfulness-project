import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/userSlice";
import CreateUser from "./CreateUser";
import "./loginStyle.css";
import { Form, Input, Button, Checkbox } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

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
  if (createUser) return <CreateUser />;

  const handleLoginSubmit = async (event) => {
    // event.preventDefault();
    const response = await axios.post("/api/auth", credentials);
    const token = response.data;
    window.localStorage.setItem("token", token);
    loginWithToken(token);
  };
  return (
    <div className="login-page">
      <div className="login-section">
        {/* <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onSubmit={handleLoginSubmit}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              onValuesChange={onChange}
              value={credentials.username}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              onValuesChange={onChange}
              value={credentials.password}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form> */}
        <form onSubmit={handleLoginSubmit}>
          <input
            placeholder="username"
            value={credentials.username}
            name="username"
            onChange={onChange}
          />
          <input
            placeholder="password"
            value={credentials.password}
            name="password"
            onChange={onChange}
          />
          <button>Log in</button>
        </form>
        <button onClick={() => setCreateUser(!createUser)}>Create user</button>
      </div>

      <div className="image-section">
        <img src="images/login-page.jpg" alt="login-page-image" />
      </div>
    </div>
  );
};

export default Login;
