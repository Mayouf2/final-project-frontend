import React , {useState , useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import "./Profile.css"
import {useHistory} from "react-router-dom"
import { render } from "react-dom";

import { storage } from "../firebase/firebase";



export default function Profile({token , setToken}) {
const [user, setUser] = useState([])
const history = useHistory();

//////////////////////////////////////////////
const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [password, setpassword] = useState("")
const [image, setImage] = useState(null);
const [bio, setBio] = useState("")



const [url, setUrl] = useState("");
const [progress, setProgress] = useState(0);


//////////////////////
const [updateVes, setupdateVes] = useState(false)
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
    
        
    }, [user , url ,progress , image])
    
    const on = () => {
        
            setupdateVes(!updateVes)
    }

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
        newImg:url
        },
        {headers: { authorization: "Bearer " + token },
        },
       
        )
        setImage(res.data)
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


    //////////////////////////////////////////
    //////////////////////////////////////////

    const updateImg = (e)=>{
        if (e.target.files[0]) {
        setImage(e.target.files[0]);
    }
    }

    
    //////////////////////////////////////////
    //////////////////////////////////////////
    //////////////////////////////////////////
    //////////////////////////////////////////
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setUrl(url);
          });
      }
    );
  };


    //////////////////////////////////////////
    //////////////////////////////////////////
    //////////////////////////////////////////
    //////////////////////////////////////////
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
          const Result =  <>
            <div className='userup'>
            <label htmlFor="">Name</label>
            <input type="text" value={name} onChange={(e)=>{updateName(e)}}/>
            {/* <label htmlFor=""  >Email</label>
            <input type="text" onChange={(e)=>{updateEmail(e)}}/> */}
            {/* <label htmlFor=""  >Password</label>
            <input type="text" onChange={(e)=>{updatePassword(e)}}/> */}
            <label htmlFor="" >image</label>
            <input type="file"   onChange={(e)=>{updateImg(e)}}/>
            <button onClick={()=>{handleUpload()}}>Upload</button>
            <div className="output">
      </div>
            <label htmlFor=""  >Bio</label>
            <textarea name="" id="" value={bio}  cols="25" rows="5" onChange={(e)=>{updateBio(e)}}></textarea>
            <button onClick={()=>{
                // handleUpload();
                updateUserName();
                updateUserBio();
                updateUserImage();
                setupdateVes(false);
                }}>Save</button>
            </div>
              </>

    return (
        <div>
        {/* <h1 className='user'>Profile</h1> */}

        <div className='user'>
            <img className='profileImg' src={user.img} alt="" />
             <h1>{user.name}</h1>
             {/* <h1>{user.email}</h1> */}
             <h1>{user.bio}</h1>
             <h1>{user.admin}</h1>
             <div className='buttons'>
             <button  className='del'  onClick={()=>{deleteProfile()}}>Delete profile</button>
             <button className='up' onClick={on}>Update profile</button>
             {/* <img src={url || "http://via.placeholder.com/300"} alt="firebase-image" /> */}
             { updateVes ? Result : "" }
             </div>
            </div>

           
        </div>
    )
}
render(<Profile />, document.querySelector("#root"));
