import React , {useState , useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import "./Profile.css"
import {useHistory} from "react-router-dom"


export default function Profile({token , setToken}) {
const [user, setUser] = useState([])
const history = useHistory();

//////////////////////////////////////////////
const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [password, setpassword] = useState("")
const [img, setImg] = useState("")
const [bio, setBio] = useState("")
//////////////////////////////////////////////
// const { id }= useParams()

    useEffect(() => {
        axios.get(`http://localhost:5000/user`,
        
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
    

    const updateUserName = () =>{
        const res = axios.put("http://localhost:5000/username" , 
        {
        newName:name ,
        },
        {headers: { authorization: "Bearer " + token },
        }
        )
        setName(res.data)
        }
    const updateUserEmail = () =>{
        const res = axios.put("http://localhost:5000/useremail" ,   {
        newEmail:email ,
        },
        {headers: { authorization: "Bearer " + token },
        },
      
        )
        setEmail(res.data)
        }

        const updateUserImage = () =>{
        const res = axios.put("http://localhost:5000/userimage" , 
        {
        newImg:img ,
        },
        {headers: { authorization: "Bearer " + token },
        },
       
        )
        setImg(res.data)
        }
        const updateUserBio = () =>{
        const res = axios.put("http://localhost:5000/userbio" , 
        {
        newBio:bio ,
        },
        {headers: { authorization: "Bearer " + token },
        },
       
        )
        setBio(res.data)
        }

//////////////////////////////////////////////
    const updateName = (e)=>{
        setName(e.target.value)

    }
    const updateEmail = (e)=>{
        setEmail(e.target.value)
    }
    const updatePassword = (e)=>{
        setpassword(e.target.value)
    }
    const updateImg = (e)=>{
        setImg(e.target.value)
    }
    const updateBio = (e)=>{
        setBio(e.target.value)
    }

    const deleteProfile = async (id, index)=>{
        setToken("");
        const res = await axios.delete(`http://localhost:5000/user/${id}`,{
          headers:{authorization: "Bearer " + token},
        });
        
        if (res.data == "delete"){
        setUser(user);
        
        }
        if (res.status === 200){
            history.push("/SignUp")
        }
          }

    return (
        <div>
        <h1 className='user'>Profile</h1>

        <div className='user'>
            <img className='profileImg' src={user.img} alt="" />
             <h1>{user.name}</h1>
             {/* <h1>{user.email}</h1> */}
             <h1>{user.bio}</h1>
             <h1>{user.admin}</h1>
             <button  className='del' onClick={()=>{deleteProfile()}}>Delete profile</button>
            </div>


            <div className='user'>
            <label htmlFor="">Name</label>
            <input type="text"  onChange={(e)=>{updateName(e)}}/>
            <label htmlFor=""  >Email</label>
            <input type="text" onChange={(e)=>{updateEmail(e)}}/>
            {/* <label htmlFor=""  >Password</label>
            <input type="text" onChange={(e)=>{updatePassword(e)}}/> */}
            <label htmlFor="" >image</label>
            <input type="text"  onChange={(e)=>{updateImg(e)}}/>
            <label htmlFor=""  >Bio</label>
            <input type="text" onChange={(e)=>{updateBio(e)}}/>
            <button onClick={()=>{
                updateUserName();
                updateUserEmail();
                updateUserImage();
                updateUserBio();
                }}>Save</button>
            </div>
           
        </div>
    )
}
