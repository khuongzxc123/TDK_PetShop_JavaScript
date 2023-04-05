import { Form, Input, Button } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { message } from "antd";
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (value) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      await axios.post("http://127.0.0.1:8081/api/users/register", value);
      message.success("Register Successfully");
      navigate("/login");
      dispatch({ type: "HIDE_LOADING" });
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      message.error("Something went wrong");
      console.log(error);
    }
  };
  //currently login user
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      localStorage.getItem("auth");
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div className="register">
        <div className="register-form">
          <h1>PET SHOP</h1>
          <h3>Register Page</h3>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter name" }]}
            >
              <Input></Input>
            </Form.Item>
            <Form.Item
              name="userId"
              label="User ID"
              rules={[{ required: true, message: "Please enter your ID" }]}
            >
              <Input></Input>
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <div className="d-flex justify-content-between">
              <p>
                Already Register Please--<Link to="/login"> Login Here !</Link>
              </p>
              <Button type="primary " htmlType="submit">
                REGISTER
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
