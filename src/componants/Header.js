import React , {useEffect , useState} from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./Header.css"

export default function Header({token , setToken}) {
  const [user, setUser] = useState([])
  const { id }= useParams()

  useEffect(() => {
    axios.get(`http://localhost:5000/user`,
    {headers: { authorization: "Bearer " + token },
    }
    )
    .then(res =>{
        setUser(res.data)
        console.log(res.data);
      
    })
    .catch(err => {
      console.log(err);
    })

    
}, [token])
    return (
        <div>
             <div className="container">
        <div className="main" >
        <img className="logo" src="https://www.thesecret.tv/wp-content/uploads/2020/04/icon-books-578x384.png" alt="" />
        {(token)?(
            <div className='navitems'>
            <Link id='navLink' to="/">Home </Link> 
             <Link id='navLink' to="/Books">Books</Link> 
            <Link id='navLink' to="/Favorite">My books</Link> 
            
<div class="dropdown">
  <img  className='accountImg' src={user.img} alt="" />
  <span>{user.name}</span>
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
