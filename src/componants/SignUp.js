import React, { useState } from "react";
import {useHistory} from "react-router-dom"
import axios from "axios";
import "./signUp.css"




export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // you can use variable instded of state in this  case
  const history = useHistory();
  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const addUser = async () => {
    if(email === "" || password === "" || name === "" ){
      
      alert("Email, Password and Name is required!");
      history.push("/SignUp")
    }
      console.log({
        name: name,
        email: email,
        password: password,
      });
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/signUp`, {
      name: name,
      email: email,
      password: password,
    });
    if (response.status === 201){
        history.push("/login")
    }
  };
  return (
    <div className="loginDiv">
                 <div className="formbox3">
                 <h3>Sign Up</h3>
            <form id="form" >
            <label for="">Name</label>
      <input
      className="asd"
        onChange={(e) => {
          changeName(e);
        }}
        placeholder="enter your name"
      />
<label for="">Email</label>
      <input
      className="asd"
        onChange={(e) => {
          changeEmail(e);
        }}
        placeholder="enter your email"
      />
      <label for="">Password</label>

      <input
      className="asd"
        onChange={(e) => {
          changePassword(e);
        }}
        type="password"
        placeholder="enter your password"
      />
      <button
      type="button"
      id="btn"
      className="mainbox3"
        onClick={() => {
          addUser();
        }}
      >
        sign up
      </button>
      </form>	
      </div>
    </div>
  );
}
