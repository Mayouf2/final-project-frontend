import React , {useEffect , useState}from 'react'
import axios from 'axios'
import { FaHeart } from 'react-icons/fa';
import "./books.css"




export default function Favorite() {
    const [Likes, setLikes] = useState([])
    const [Books, setBooks] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/like')
        .then(res =>{
        //   console.log("likes",res.data)
          setLikes(res.data)
        })
        .catch(err => {
          console.log(err);
        })
    }, [])

    const likedHandleClick = async (id) => {
            let response = await axios.post(`http://localhost:5000/like/${id}`, {
                id: id
                
            });
            
            if (response.data == "-1") {
                response = await axios.delete(`http://localhost:5000/like/${id}`)
                console.log('delete' , response.data);
            }else{
                setBooks(response.data)
            }
            
        }
        function toggleColor(id){
            const arrCopy = [...Books]
            if (arrCopy[id-1].like == "black"){
                arrCopy[id-1].like = "red"
            }else{
                arrCopy[id-1].like = "black"
            }
            setBooks(arrCopy)
        }
    return (
        <div>
        <div className="booksMain">
            {Likes.map((elme , i)=>{
            return ( <div >
            <div className="book"> 
                <h3>{elme.name}</h3>
                <img className="bookImg" src={elme.img}   alt="" />
                <p>{elme.description}</p>
                <p>{elme.price}</p>
                <div id='handle'  onClick={()=>{likedHandleClick(elme.id);toggleColor(elme.id)}}><FaHeart id='icon' style={{color:elme.like}} /> </div>

            </div>
            
        </div>)
        })}
        </div>
        </div>
    )
}
