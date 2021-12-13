import React from 'react'
import { Link } from "react-router-dom";
import "./Header.css"

export default function Header({token , setToken}) {
    return (
        <div>
             <div className="container">
        <div className="main" >
        <img className="logo" src="https://i.pinimg.com/originals/9a/fc/1b/9afc1bb2edfae4ab0b3238fef09c3ec5.jpg" alt="" />
        {(token)?(
            <div className='navitems'>
            <Link id='navLink' to="/">Home </Link> 
             <Link id='navLink' to="/Books">Books</Link> 
            <Link id='navLink' to="/Favorite">My books</Link> 
            
<div class="dropdown">
  <button class="dropbtn">account</button>
  <div class="dropdown-content">
  <Link className='dro' to="/Profile">Profile</Link> 
            <Link className='dro'  className="link" to="/login" onClick={()=>{setToken("")  
             }}>Log out</Link>
  </div>
</div>
            </div>
        ):(
            <div  className='navitems'>
            <Link id='navLink' to="/">Home</Link> 
             <Link id='navLink' to="/Books">Books</Link> 
            <Link id='navLink' to="/Login">Login</Link>
           <Link id='navLink' to="/SignUp">SignUp</Link>
            </div>
        )}
      </div>
      </div> 
        </div>
    )
}
