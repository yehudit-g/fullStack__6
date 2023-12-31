import React, { useState } from "react";
import ReactDOM from "react-dom";
import {Navigate} from "react-router-dom"
import { Link } from 'react-router-dom';


import "../Css/LogSign.css";

export default function Login() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [idUser, setIdUser] = useState(0)
  const [nameUser, setNameUser] = useState(0)

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };


  const getUser = async (uname, pass)  => {
    try {
      //לאיזו טבלה השאילתא הולכת?טבלת משתמשים סיסמאות או משתמשים?
      const response = await fetch(`http://localhost:3000/users?username=${uname}&password=${pass}`);
      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse;
      }
      throw new Error('Request failed of login');
    } catch (error) {
      console.log("Error:", error);
       return null
    }
  }
 
   
   
  const handleSubmit = async (event) => {
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    let userData = await getUser(uname.value, pass.value);

    if (userData) {
        setIsSubmitted(true);
        localStorage.setItem('currentUser', JSON.stringify(userData[0]));
        setIdUser(userData.id)
        setNameUser(userData[0].username)
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
        <div className="title">Log In / <Link className="linkDiv" to='/register'>(Sign In)</Link></div>
        {isSubmitted ? <Navigate to={'/users/' + idUser}/> : renderForm}
      </div>
    </div>
  );
}