import React, { useState, useRef, useEffect } from "react";
import theme from "../config/theme";
import "./UI/login.css";
import API from "../config/api";

function Register(props) {
  const name = useRef();
  const email = useRef();
  const phone = useRef();
  const password = useRef();
  const confirmpassword = useRef();
  const dob = useRef();
  const [Message, setMessage] = useState("");
  const [Error, setError] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!Error) {
        props.changeRoute("");
      }
      setMessage("");
      setError(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [Message, Error, props]);
  function onSubmit(e) {
    e.preventDefault();
    if (name.current.value === "") {
      setMessage("Name is required, please enter your name");
      setError(true);
      return;
    }
    if (email.current.value === "") {
      setMessage("Email is required, please enter your email");
      setError(true);
      return;
    }
    if (phone.current.value === "") {
      setMessage("Phone number is required, please enter");
      setError(true);
      return;
    }
    if (password.current.value === "") {
      setMessage("Password is required, please enter password");
      setError(true);
      return;
    }
    if (confirmpassword.current.value !== password.current.value) {
      setMessage("Password and confirm password, do not match");
      setError(true);
      return;
    }
    if (dob.current.value === "") {
      setMessage("Please enter date of birth");
      setError(true);
      return;
    }
    registerUser();
  }
  async function registerUser() {
    try {
      fetch(API.domain + API.signupURL, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.current.value,
          email_id: email.current.value,
          dob: new Date(dob.current.value).toISOString(),
          password: password.current.value,
          address: "",
          phoneNo: phone.current.value,
          user_role: "user",
        }),
      })
        .then((Response) => Response.json())
        .then((data) => {
          if (data.status) {
            props.changeRoute("Login", true);
          } else {
            setError(true);
            setMessage(data.message);
          }
        });
    } catch (error) {
      setMessage(error.message);
      setError(true);
    }
  }
  return (
    <div className="login">
      <form style={theme.card} onSubmit={onSubmit}>
        <h1 style={theme.accent_color}>Register</h1>
        <div
          style={Message === "" ? theme.novalidation : theme.validation(Error)}
        >
          {Message}
        </div>
        <input
          style={theme.input}
          placeholder="Name"
          ref={name}
          type="name"
        ></input>
        <input
          style={theme.input}
          placeholder="Email"
          ref={email}
          type="email"
        ></input>
        <input
          style={theme.input}
          placeholder="Phone number"
          ref={phone}
          type="phone"
        ></input>
        <input
          style={theme.input}
          placeholder="password"
          ref={password}
          type="Password"
        ></input>
        <input
          style={theme.input}
          placeholder="Confirm password"
          ref={confirmpassword}
          type="password"
        ></input>
        <label>Date of Birth</label>
        <input
          style={theme.input}
          placeholder="Date of Birth"
          ref={dob}
          type="date"
        ></input>
        <button
          style={theme.accent_button}
          onMouseOver={theme.hoverAccentButton}
          onMouseLeave={theme.hoverNormalButton}
          type="Submit"
        >
          Register
        </button>
        <div>
          Already have an Acount ?{" "}
          <span
            style={theme.link}
            onClick={() => {
              props.changeRoute("Login", false);
            }}
          >
            Log In
          </span>
        </div>
      </form>
    </div>
  );
}

export default Register;
