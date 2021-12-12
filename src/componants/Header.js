import React from 'react'
import { Link } from "react-router-dom";
import "./Header.css"


export default function Header({token , setToken}) {
    return (
        <div>
             <div className="container">
        <div className="main" >
        <img className="logo" src="https://i.pinimg.com/originals/3c/7a/f3/3c7af3c03a1fc34f679d6cb8d1af703a.png" alt="" />
        {(token)?(
            <div className='navitems'>
            <Link id='navLink' to="/">Home </Link> 
             <Link id='navLink' to="/Books">Books</Link> 
            <Link id='navLink' to="/Favorite">My books</Link> 
            <Link id='navLink'  className="link" to="/login" onClick={()=>{setToken("")  
             }}>Log out</Link>
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
