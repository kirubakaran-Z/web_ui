import "./UI/login.css";
import React, { useState, useRef, useEffect } from "react";
import theme from "../config/theme";
import logo from "../assets/logo.png";
import API from "../config/api";
import cookieService from "../service/cookieService";
function Login(props) {
  const email = useRef();
  const password = useRef();
  const [Message, setMessage] = useState("");
  const [Error, setError] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
      setError(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [Message, Error]);

  function onSubmit(e) {
    e.preventDefault();
    setMessage("");
    if (email.current.value === "") {
      setMessage("Email is required, please enter a email");
      setError(true);
      return;
    }
    if (password.current.value === "") {
      setMessage("Password is required, please enter password");
      setError(true);
      return;
    }
    LogInUser();
  }
  async function LogInUser() {
    try {
      fetch(API.domain + API.loginURL, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_id: email.current.value,
          password: password.current.value,
        }),
      })
        .then((Response) => Response.json())
        .then((data) => {
          if (data.status) {
            cookieService.set("token", data.user.token);
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
        <img src={logo} alt="logo"></img>
        <h1 style={theme.accent_color}>Log In</h1>
        <div
          style={Message === "" ? theme.novalidation : theme.validation(Error)}
        >
          {Message}
        </div>

        <input
          style={theme.input}
          placeholder="Enter email or phone no"
          ref={email}
          type="text"
        ></input>
        <input
          style={theme.input}
          placeholder="Enter password"
          ref={password}
          type="password"
        ></input>
        <button
          style={theme.accent_button}
          onMouseOver={theme.hoverAccentButton}
          onMouseLeave={theme.hoverNormalButton}
          type="Submit"
        >
          Log In
        </button>
        <div>
          New here ?{" "}
          <span
            style={theme.link}
            onClick={() => {
              props.changeRoute("register");
            }}
          >
            Register
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
