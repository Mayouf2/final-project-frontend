import React , {useEffect , useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import "./OneBook.css"
import ReactStars from "react-rating-stars-component";
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { RiDeleteBin5Line } from 'react-icons/ri';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from "html-react-parser"


import InputEmoji from 'react-input-emoji'








export default function OneBook({token}) {

    const [books, setBooks] = useState(null)
    const { id }= useParams()
    const [input, setInput] = useState("")
    const [comments, setcomments] = useState([])
    const [rating, setRating] = useState(0)


    useEffect(async () => {
      if(token){
        const result = await axios.get(`http://localhost:5000/book/${id}`,{
          headers: { authorization: "Bearer " + token },
        });
        setBooks(result.data);
      }
    }, [books]);


    useEffect(async () => {
  const result = await axios.get(`http://localhost:5000/comment` , 
  { headers: { authorization: "Bearer " + token } },
  ) 
  setcomments(result.data)

    } ,  []);


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
        setBooks({...books , comment: result.data.comment})
        } catch (err) {
            console.log(err.res.data,"error");
        }
    }

    const addrating = (e)=>{
      setRating(e.target.value)
    }
    
    function handleOnEnter (text) {
        console.log('enter', text)
      }

    const ratingChanged = (newRating) => {
      setRating(newRating);
};
    return (
        <div>  
         {books?
        <div>
        <div className='onebookmain'>
            <div className="book">
              <img className="bookImg" src={books.img} alt="" />
              <a className='href' href={books.url} target="_blank">want to read?</a>
            </div>
            <div className='description'>
              <h3>{books.name}</h3>
              <p>By: {books.auther}</p> <br />
              <p>{books.description}</p>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                value={books.rating}
                activeColor="#ffd700" />
            </div>
          </div><div className='comments'>
              <div>
                <input    type="text" onChange={(e) => { changeComment(e); } } ></input>
                <select id="cars" name="cars" onChange={(e)=>{addrating(e)}}>
    <option value="0">Rate:</option>
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    <option>5</option>
  </select>
                <button onClick={()=>{addComment()}}>comment</button>
              </div>
              <h1>{books.comment && books.comment.map((elm, i) => {
                return <div className='singleComment' key={i}>

                    {/* <img src={elm.img} alt="" /> */}
                    <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                value={elm.rating}
                activeColor="#ffd700" />
                  <p> {elm.userName}:</p>
                  <p >{parse( elm.comment)}</p>
                  <p>{elm.rating}</p>
                  <button onClick={() => { deletecomment(elm.comment); } }><RiDeleteBin5Line/> </button>
                </div>;
              })}</h1>
              <div>
              {/* <CKEditor
          editor={ClassicEditor}
          data={input}
          onChange={(e, editor) => { const data = editor.getData()
            setInput(data)
          }}
        /> */}
              </div>


        {/* <InputEmoji
          value={input}
          onChange={setInput}
          cleanOnEnter
          onEnter={addComment}
          placeholder="Type a message"
        /> */}


            </div>
            </div>
         :""}
        </div>
    )
}
