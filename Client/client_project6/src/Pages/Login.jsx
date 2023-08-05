import React, { useState } from "react";
import ReactDOM from "react-dom";
import {Navigate} from "react-router-dom"

import "../Css/Login.css";

export default function Login() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [idUser, setIdUser] = useState(0)

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const getUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse;
      }
      throw new Error('Request failed');
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    let users = await getUsers();
    const userData = users.find((user) => user.username === uname.value);
    
    if (userData) {
      if (userData.address.geo.lat.slice(-4) !== pass.value) {
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
        localStorage.setItem('currentUser', JSON.stringify(userData));
        setIdUser(userData.id)
      }
    } else {
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>User Name </label>
          <input type="text" name="uname" placeholder="Enter the name here" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" placeholder="Enter the password here" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" value="Send"/>
          <input type="reset" value="Reset"/>
        </div>
      </form>
    </div>
  );

  return (
    <div className="login">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <Navigate to={'/users/' + idUser}/> : renderForm}
      </div>
    </div>
  );
}