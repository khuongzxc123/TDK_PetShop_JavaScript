import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_API}/api/user/register`,
        { email, password, firstname, lastname, phone }
      );
      if (res.data.success) {
        toast.success(res.data.mes);
        navigate("/login");
      } else {
        toast.error(res.data.mes);
      }
    } catch (error) {
      console.log(error);
      toast.error("SomeThing Went Wrong");
    }
  };
  return (
    <Layout title={"Register Account"}>
      <div className="register">
        <h1>Register Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              className="form-control"
              id="exampleInputFirstName"
              placeholder="Enter Your First Name"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              className="form-control"
              id="exampleInputLastName"
              placeholder="Enter Your Last Name"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputPhoneNumber"
              placeholder="Enter Your Phone"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
