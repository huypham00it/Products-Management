import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useStateValue } from "../context/StateContext";

import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/Register";
import leaf from "../assets/images/leaf.svg";
import img from "../assets/images/register.svg";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);

  const { user, showMessage, displayAlert, isLoading, setupUser } =
    useStateValue();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, isMember } = values;

    if (!email || !password || (!name && !isMember)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password };

    if (isMember) {
      setupUser({
        currentUser,
        endPoint: "login",
        alertText: "Login Successfully! Redirecting...",
      });
    } else {
      setupUser({
        currentUser,
        endPoint: "register",
        alertText: "Created Successfully! Redirecting...",
      });
    }
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <div className="form-container">
        <div className="bg">
          <img src={img} alt="register" />
        </div>
        <form action="" className="form" onSubmit={handleSubmit}>
          <img src={leaf} alt="leaf" className="leaf" />
          <Logo />
          <h3>{values.isMember ? "Login" : "Register"}</h3>

          {showMessage && <Alert />}

          {!values.isMember && (
            <FormRow
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
            />
          )}

          <FormRow
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />

          <FormRow
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />

          <button type="submit" className="btn btn-block" disabled={isLoading}>
            Submit
          </button>

          <p>
            {values.isMember ? "Not a member yet?" : "Already a member"}
            <button type="button" onClick={toggleMember} className="member-btn">
              {values.isMember ? "Register" : "Login"}
            </button>
          </p>
        </form>
      </div>
    </Wrapper>
  );
};

export default Register;
