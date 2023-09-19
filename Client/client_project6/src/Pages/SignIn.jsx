import React, { useState } from "react";
import {Navigate, Link} from "react-router-dom"

import "../css/LogSign.css"

export default function Login() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [nameUser, setNameUser] = useState(0)

  const setPass = async(pass, userId) => {
    try {
      const newUserPass = {
        userId: userId,
        password: pass
      }
      const response = await fetch('http://localhost:3000/users_passwords', {
        method: "POST",
        mode: "cors",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUserPass),
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse;
      }
      throw new Error('Request failed');
    } catch (error) {
      console.log(error);
    }
  }

  const setUser = async (newUser) => {
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: "POST",
        mode: "cors",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser),
      });
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

    var { flname, uname, pass, phone, mail, city, street, numberhome} = document.forms[0];

    const newUser = {
      name: flname.value,
      username: uname.value,
      phone: phone.value,
      email: mail.value,
      city: city.value,
      street: street.value,
      numberhome: numberhome.value,
      status: "C",
    }

    let userData = await setUser(newUser);
    let insertPassword = await setPass(pass.value, userData[0].id);
    
    setIsSubmitted(true);
    localStorage.setItem('currentUser', JSON.stringify(userData[0]));
    setNameUser(userData[0].username)
  };

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
      <div className="input-container">
          <label>First + Last Name </label>
          <input type="text" name="flname" placeholder="Enter the first + last name here" required />
        </div>
        <div className="input-container">
          <label>User Name </label>
          <input type="text" name="uname" placeholder="Enter the username here" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" placeholder="Enter the password here" required />
        </div>
        <div className="input-container">
          <label>Phone </label>
          <input type="tel" name="phone" placeholder="Enter the phone here" required />
        </div>
        <div className="input-container">
          <label>Email </label>
          <input type="email" name="mail" placeholder="Enter the email here" required />
        </div>
        <div className="input-container">
          <label>City </label>
          <input type="text" name="city" placeholder="Enter the city here" required />
        </div>
        <div className="input-container">
          <label>Street </label>
          <input type="text" name="street" placeholder="Enter the street here" required />
        </div>
        <div className="input-container">
          <label>Number Home</label>
          <input type="text" name="numberhome" placeholder="Enter the number home here" required />
        </div>
        
        <div className="button-container">
          <input type="submit" value="Send"/>
          <input type="reset" value="Reset"/>
        </div>
      </form>
    </div>
  );

  return (
    <div className="signin">
      <div className="login-form">
        <div className="title">Sign In / <Link className="linkDiv" to='/login'>(Log In)</Link></div>
        {isSubmitted ? <Navigate to={'/users/' + nameUser}/> : renderForm}
      </div>
    </div>
  );
}