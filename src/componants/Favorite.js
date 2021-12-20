import React , {useEffect , useState}from 'react'
import axios from 'axios'
import { FaHeart } from 'react-icons/fa';
import "./books.css"
import { useParams } from 'react-router-dom';
import { Link} from 'react-router-dom';




export default function Favorite({token}) {
    const [like, setLikes] = useState([])
    // const [Books, setBooks] = useState([])
    const { id }= useParams()

    useEffect(() => {
        if(token){
            axios.get(`http://localhost:5000/like/${id}` , 
        {headers: { authorization: "Bearer " + token },
    }
    )
        .then(res =>{
          setLikes(res.data)
  console.log("likes",res.data)
        })
        .catch(err => {
          console.log(err);
        })
        }
    
    }, [like])

    // const likedHandleClick = async (id) => {
    //         let response = await axios.post(`http://localhost:5000/like/${id}`, {
    //             id: id
                
    //         });
            
    //         // if (response.data == "-1") {
    //         //     response = await axios.delete(`http://localhost:5000/like/${id}`)
    //         //     console.log('delete' , response.data);
    //         // }else{
    //         //     setBooks(response.data)
    //         // }
            
    //     }
        // function toggleColor(id){
        //     const arrCopy = [...Books]
        //     if (arrCopy[id-1].like == "black"){
        //         arrCopy[id-1].like = "red"
        //     }else{
        //         arrCopy[id-1].like = "black"
        //     }
        //     setBooks(arrCopy)
        // }
    return (
        <div>
        <h1>likes</h1>
        <div className="booksMain">
            {like && like.map((elme , i)=>{
            return ( <div >
                <div className="book">    
           <Link  to={`/book/${elme._id}`}>
           <img className="bookImg" src={elme.img}
              alt="" />
           </Link> 
           <h3>{elme.name}</h3>
           <p>By: {elme.auther}</p>
           {/* <p>{elme.description}</p> */}
           {/* <p>{elme.price}</p> */}
           {/* <div id='handle'  onClick={()=>{likedHandleClick(elme._id)}}><FaHeart id='icon' style={{color:elme.like}} /> </div> */}
           
       </div>
            
        </div>)
        })}
        </div>
        </div>
    )
}
