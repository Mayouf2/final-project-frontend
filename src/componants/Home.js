import React  , {useEffect , useState} from "react";
import "./home.css"
import { Link } from "react-router-dom";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import { FaBookmark } from 'react-icons/fa';





export default function Home({token}) {
  const [Books, setBooks] = useState([])
  const [like , setLikes] = useState([])
  const [rating, setRating] = useState(0)


  useEffect(async () => {
    if(token){
        const res = await axios.get("http://localhost:5000/like", {
          headers: { authorization: "Bearer " + token },
        });
        console.log(res.data);
        setLikes (res.data);
      }
      }, [like]);
      useEffect(() => {
        const get = async () => {
         await axios.get('http://localhost:5000/books' , {
            headers:{authorization: "Bearer " + token},

         })
         .then(res =>{
           
           setBooks(res.data)
           console.log(res.data);
         })
         .catch(error => {
           console.log(error ,"err");
         })
         }
 
         get()
         
         }, [Books])

         const likedHandleClick = async (id) => {
            let response = await axios.post(`http://localhost:5000/like/${id}`, {
                
            },  
            { headers: { authorization: "Bearer " + token } }
            );
            
                console.log(response.data)
            }

      const ratingChanged = (newRating) => {
      setRating(newRating);
};
  return (
    <div >
    <div className="mainHome">
      <div className="leftSide">
      <h2>WANT TO READ</h2>
      {like.map((elme , i)=>{
            return ( <div key={i}>
                <div className="favHome">   
           <Link  to={`/book/${elme._id}`}>
           <img className="HomeImg" src={elme.img}
              alt="" />
           </Link> 
           <div className="bookName">
           <span>{elme.name}</span> {" "} 
           <span>By: {elme.auther}</span>  {" "} <br />
           <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                activeColor="#ffd700" />
           </div> 
       </div>
            
        </div>)
        })}
      </div>



      <div className="rightSide">
      <h2>Recommended</h2>
      {Books.map((elme , i)=>{
            return ( <div key={i}>
            <div className="Homebook"> 
            <Link  to={`/book/${elme._id}`}>
                <img className="HomebookImg" src={elme.img}
                   alt="" />
                </Link> 
                <h3>{elme.name}</h3>
                <p>By: {elme.auther}</p> 
                <div className="HomeFavButton">
                <FaBookmark style={{color:"black"}} onClick={()=>{likedHandleClick(elme._id)}} />
                </div>
            </div>
        </div>)
        })} 
      </div>
      <div className="center"></div>
      </div>
    </div>
  );
}
