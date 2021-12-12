import React , {useEffect , useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';



export default function OneBook() {

    const [books, setBooks] = useState("")
    const { id }= useParams()

    useEffect(() => {
        axios.get(`http://localhost:5000/book/${id}`)
        .then(res =>{
          setBooks(res.data)
          console.log(res.data.id);
        })
        .catch(err => {
          console.log(err);
        })
        
    }, [books])

    return (
        <div>  
        <div>
        <h1>hello</h1>  
            <div className="book"> 
           <h3>Title: {books.name}</h3>
           <img className="bookImg" src={books.img}   alt="" /> 
           <p>Description: {books.description}</p>
           <p>Price: {books.price}</p>           
       </div>
       </div>
        </div>
    )
}
