import React , {useState , useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import "./Profile.css"

export default function Profile({token}) {
const [user, setUser] = useState([])
// const [name, setname] = useState("")
const { id }= useParams()

    useEffect(() => {
        axios.get(`http://localhost:5000/user`,
        
        {headers: { authorization: "Bearer " + token },
        },

        )
       
        .then(res =>{
            setUser(res.data)
            console.log(res.data);
          
        })
        .catch(err => {
          console.log(err);
        })
    
        
    }, [token])

    console.log(user.name);
    return (
        <div>
        <h1 className='user'>Profile</h1>

        <div className='user'>
            <img className='profileImg' src={user.img} alt="" />
             <h1>{user.name}</h1>
             <h1>{user.email}</h1>
             <h1>{user.admin}</h1>
            </div>


        {/* {user.map((elem)=>{
            return <div>
                
        {(token)?(
            <div className='user'>
            <img className='profileImg' src={elem.img} alt="" />
             <h1>{elem.name}</h1>
             <h1>{elem.email}</h1>
             <h1>{elem.admin}</h1>
            </div>
        ):(
            <h1>No user found</h1>
        )}
            </div>
        })} */}
           
        </div>
    )
}
