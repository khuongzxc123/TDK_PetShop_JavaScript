import { Form, Input, Button } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { message } from "antd";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try {
      dispatch({ type: "SHOW_LOADING" });

      // Make a request to the server to validate the user's credentials
      const res = await axios.post(
        "http://localhost:8081/api/users/login",
        values
      );

      // If the user's credentials are correct, save the user's details to local storage and navigate to the home page
      localStorage.setItem("auth", JSON.stringify(res.data));
      message.success("User logged in successfully");
      navigate("/");

      dispatch({ type: "HIDE_LOADING" });
    } catch (error) {
      // If the server returns an error, display an error message
      dispatch({ type: "HIDE_LOADING" });
      if (error.response && error.response.data && error.response.data.error) {
        message.error(error.response.data.error);
      } else {
        message.error("An error occurred. Please try again later.");
      }
    }
  };

  useEffect(() => {
    // Check if the user is already logged in and redirect to the home page if they are
    if (localStorage.getItem("auth")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="register">
      <div className="register-form">
        <h1>PET SHOP</h1>
        <h3>Login Page</h3>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="userId"
            label="User ID"
            rules={[{ required: true, message: "Please input your user ID!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <div className="d-flex justify-content-between">
            <p>
              Not a user Please -- <Link to="/register"> Register Here!</Link>
            </p>
            <Button type="primary" htmlType="submit">
              LOGIN
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
