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
    const [rating, setRating] = useState(0)
    const [url, seturl] = useState("")


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
const addrating = (e)=>{
    setRating(e.target.value)
  }
  const addUrl = (e)=>{
    seturl(e.target.value)
  }

const addBook = async()=>{
    if(!name && !auther && !img && !description){
        return;
      }
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/addbook` , {
          name:name ,
          auther:auther,
          img:img,
          description:description,
          rating:rating,
          url:url
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
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/getUsers`,
        
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

    // const goToChat=(id,name)=>{
    //   history.push(`/Chat/${id}`);
    // }


    // const deleteUser = async (id, index)=>{
    //     const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/AdminDeleteUser/${id}`,
    //     {headers:{authorization: "Bearer " + token},}
    //     );
        
    //     if (res.data == "delete"){
    //     setUser(user);
        
    //     }
    //       }
//  name ,auther, img ,description,

    return (
        <div className='wholee'>
        <div className='users'>
        <h2>Users</h2>
            {user && user.map((elme , i )=>{
                return (<div>
                <div className='usersInfo'>
                <img className='imgs' src={elme.img} alt="" />
                <h3 className='username'>{elme.name}</h3> <br />
                <p className='join'>Joined {elme.time}</p>
                {/* <button onClick={()=>{goToChat(elme._id)}}>chat </button> */}

                {/* <button onClick={()=>{deleteUser(elme._id)}}>delete</button> */}
                {/* {elme.admin ? (
                ""
              ) : (
                <button
                  className="btn-users"
                  onClick={() => {
                    deleteUser(elme._id);
                  }}
                >
                  Delete User
                </button>
              )} */}
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
            <textarea name="" className="asd" placeholder='description'  onChange={(e)=>{addDescription(e)}} id="" cols="30" rows="10"></textarea>
            <label for="">Link</label>
            <input type="text" className="asd" placeholder='book link'  onChange={(e)=>{addUrl(e)}}/>
            <label for="">Rating</label>
            {/* <input type="text" className="asd" placeholder='Rating'  onChange={(e)=>{addrating(e)}}/> */}
            <select id="cars" name="cars" onChange={(e)=>{addrating(e)}}>
    <option value="0">Rate:</option>
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    <option>5</option>
  </select> <br />
            <button type="button" id="btn" className='button' onClick={()=>{addBook()}}>Add</button>
            </form>
            </div>

        </div>
    )
}
