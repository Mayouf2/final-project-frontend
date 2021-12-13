import React , {useEffect , useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import "./OneBook.css"
import ReactStars from "react-rating-stars-component";
import FloatingLabel from 'react-bootstrap/FloatingLabel'




export default function OneBook({token}) {

    const [books, setBooks] = useState({comment:[]})
    const { id }= useParams()
    const [input, setInput] = useState("")

    useEffect(() => {
        axios.get(`http://localhost:5000/book/${id}`)
        .then(res =>{
          setBooks(res.data)
          
        })
        .catch(err => {
          console.log(err);
        })
        
    }, [books])


    const changeComment=(e)=>{
        setInput(e.target.value)
      }
      const addComment=async()=>{
          try {
            const result = await axios.post(
                `http://localhost:5000/comment/${id}`,
                {
                    comment:input
                },
                { headers: { authorization: "Bearer " + token } }
              );
              setBooks({...books , comment: result.data.comment})
          } catch (err) {
              console.log(err);
          }
      }
    const deletecomment =async (comment)=>{
        try {
            const result = await axios.put(`http://localhost:5000/comment/${id}`,
        {comment:comment},
        {headers: { authorization: "Bearer " + token }})
        console.log(result.data);
        setBooks({...books , comment: result.data.comment})
        } catch (err) {
            console.log(err.res.data,"error");
        }
    }

    

    const ratingChanged = (newRating) => {
  console.log(newRating);
};
    return (
        <div>  
        <div className='onebookmain'>
         
            <div className="book"> 
           <h3>{books.name}</h3>
           <p>By: {books.auther}</p>
           <img className="bookImg" src={books.img}   alt="" /> 
           {/* <p>Description: {books.description}</p> */}
           <a className='href' href="https://www.goodreads.com" target="_blank">want to read?</a>
                     
       </div>
       <div className='description'>
        <h1>description</h1>
        <p>Description: {books.description}</p>
        
        <ReactStars
    count={5}
    onChange={ratingChanged}
    size={24}
    activeColor="#ffd700"
  />
       </div>
       </div>
       <div className='comments'>
       <div>
       <input type="text" onChange={(e)=>{changeComment(e)}}/>
         <button onClick={()=>{addComment()}}>add</button>
         <button  onClick={()=>{deletecomment()}}>delete</button>
       </div>
         <h1>{books.comment.map((elm,i)=>{
                return <div className='singleComment' key={i}>
                    <p className='user'> {elm.userName}:</p> 
                    <p className='comm'>{elm.comment}</p>
                    <button onClick={()=>{deletecomment(elm.comment)}}>delet </button>
              </div>
            })}</h1>
       </div>
        </div>
    )
}
