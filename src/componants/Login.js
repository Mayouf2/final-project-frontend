import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./login.css"


export default function Login({setToken}) {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // you can use variable instded of state in this  case
  const history = useHistory();
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const checkLogin = async () => {
    if(email === "" || password === ""){
      alert("Email and Password is required!!");
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
        email: email,
        password: password,
      });
      setToken(response.data.token);
      if(response.status == 200){
        history.push("/");
      }
      
    } catch (error) {
      console.log(error);
    }
  };
    return (
        <div>
        <div className="loginDiv">
             <div className="formbox2">
        <h3>Log In</h3>
        <form id="form" action="" method="post">
            <label for="">Email</label>
            <input type="text" name="username" placeholder="Enter your Email"  onChange={(e) => {
          changeEmail(e);
        }} className="asd"/>
            <label for="">Password</label>
            <input type="password" placeholder="Enter your Password"   onChange={(e) => {
          changePassword(e);
        }} id="" name="password" className="asd"/>
            <Link  to={`/Login`}>
            <input id="btn" type="submit" name="submit" value="Log In"  onClick={() => {
          checkLogin();
        }} className="mainbox2"/>
            </Link>
            <label for="">New ?</label>
            <Link  to={`/SignUp`}>
            <button  className="mainbox2">Register Now</button>
            </Link>
        </form>	
    </div>
    </div>
        </div>
    )
}
