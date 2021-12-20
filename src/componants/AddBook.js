import axios from 'axios'
import React , {useState , useEffect} from 'react'
import "./home.css"
import {useHistory} from "react-router-dom"



export default function AddBook({token}) {
    const [books, setbooks] = useState([])
    const [name, setname] = useState("")
    const [auther, setauther] = useState("")
    const [img, setimg] = useState("")
    const [description, setdescription] = useState("")
    const history = useHistory();
    

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




//  name ,auther, img ,description,

    return (
        <div>
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
            <button type="button" id="btn" onClick={()=>{addBook()}}>Add</button>
            </form>
            </div>

        </div>
    )
}
