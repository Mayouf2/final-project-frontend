import axios from 'axios'
import React , {useState , useEffect} from 'react'
import "./AddBook.css"
import {useHistory} from "react-router-dom"



export default function AddBook({token}) {
    const [books, setbooks] = useState([])
    const [name, setname] = useState("")
    const [auther, setauther] = useState("")
    const [img, setimg] = useState("")
    const [description, setdescription] = useState("")
    const history = useHistory();

    const [user, setUser] = useState([])

    

const addName = (e)=>{
    setname(e.target.value)
}
const addAuther = (e)=>{
    setauther(e.target.value)
}
const addImg = (e)=>{
    setimg(e.target.value)
}
const addDescription = (e)=>{
    setdescription(e.target.value)
}

const addBook = async()=>{
    if(!name && !auther && !img && !description){
        return;
      }
      const res = await axios.post("http://localhost:5000/addbook" , {
          name:name ,
          auther:auther,
          img:img,
          description:description
      },
      {
        headers:{authorization: "Bearer " + token},
        })
      setbooks(res.data)
      if (res.status === 201){
        history.push("/books")
    }
}


useEffect(() => {
        axios.get(`http://localhost:5000/getUsers`,
        
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


    // const deleteUser = async (id, index)=>{
    //     const res = await axios.delete(`http://localhost:5000/AdminDeleteUser/${id}`,
    //     {headers:{authorization: "Bearer " + token},}
    //     );
        
    //     if (res.data == "delete"){
    //     setUser(user);
        
    //     }
    //       }
//  name ,auther, img ,description,

    return (
        <div>
        <div className='users'>
        <h2>Users</h2>
            {user && user.map((elme , i )=>{
                return (<div>
                <div className='usersInfo'>
                <img className='imgs' src={elme.img} alt="" />
                <h3 className='username'>{elme.name}</h3> <br />
                <p className='join'>Joined {elme.time}</p>
                {/* <button onClick={()=>{deleteUser()}}>delete</button> */}
                </div>
             
                </div>)
            })}
        </div>
        <div className="formbox">
            <h1>add book</h1>
            <form id="form" >
            <label for="">Name</label>
            <input type="text" className="asd" placeholder='name' onChange={(e)=>{addName(e)}}/>
            <label for="">Auther</label>
            <input type="text" className="asd" placeholder='auther'  onChange={(e)=>{addAuther(e)}}/>
            <label for="">Image</label>
            <input type="text" className="asd" placeholder='img'  onChange={(e)=>{addImg(e)}}/>
            <label for="">description</label>
            <input type="text" className="asd" placeholder='description'  onChange={(e)=>{addDescription(e)}}/>
            <button type="button" id="btn" className='button' onClick={()=>{addBook()}}>Add</button>
            </form>
            </div>

        </div>
    )
}
