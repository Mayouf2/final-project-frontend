import React , {useState , useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import "./UserProfile.css"
import {useHistory} from "react-router-dom"





export default function UserProfile({token}) {
    const [user, setUser] = useState(null)
    const history = useHistory();
    const { id } = useParams();

    

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/getOneUser/${id}`,
        
        {headers: { authorization: "Bearer " + token },
        },

        )
       
        .then(res =>{
            setUser(res.data)
          
        })
        .catch(err => {
          console.log(err);
        })
    
        
    }, [user])

    const goToChat=(id,name)=>{
      history.push(`/Chat/${id}`);
    }
    return (
        <div>
            <h1>user profile</h1>

            {user ?
                <div className='users'>
                    <img className='userImg' src={user.img} alt="" />
                    <h3>{user.name}</h3>
                    <button onClick={()=>{goToChat(user._id)}}>chat </button>
                    </div>
            :""}


                    
        </div>
    )
}
