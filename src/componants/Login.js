import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./home.css"


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
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      });
      setToken(response.data.token);
      history.push("/Books");
    } catch (error) {
      console.log(error);
    }
  };
    return (
        <div>
        <div className="loginDiv">
             <div className="formbox">
        <h3>Log In</h3>
        <form id="form" action="" method="post">
            <label for="">Email</label>
            <input type="text" name="username"   onChange={(e) => {
          changeEmail(e);
        }} className="asd"/>
            <label for="">Password</label>
            <input type="password"   onChange={(e) => {
          changePassword(e);
        }} id="" name="password" className="asd"/>
            <Link  to={`/`}>
            <input id="btn" type="submit" name="submit" value="Log In"  onClick={() => {
          checkLogin();
        }} className="mainbox"/>
            </Link>
            <label for="">New ?</label>
            <Link  to={`/SignUp`}>
            <button  className="mainbox">Register Now</button>
            </Link>
        </form>	
    </div>
    </div>
        </div>
    )
}
