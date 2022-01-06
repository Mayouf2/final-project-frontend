import React , {useEffect , useState}from 'react'
import axios from 'axios'
import { FaHeart } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { Link} from 'react-router-dom';
import "./Fav.css"
import { RiDeleteBin5Line } from 'react-icons/ri';





export default function Favorite({token}) {
    const [like, setLikes] = useState([])
    // const [Books, setBooks] = useState([])
    const { id }= useParams()

    useEffect(async () => {
        if(token){
            const res = await axios.get("http://localhost:5000/like", {
              headers: { authorization: "Bearer " + token },
            });
            console.log(res.data);
            setLikes (res.data);
          }
          }, [like]);

    const removeLike = async (id ,i)=>{
            const res = await axios.delete(`http://localhost:5000/like/${id}`,{
              headers:{authorization: "Bearer " + token},
            });
        console.log(res.data);
        const copied = [...like]
        copied.splice(i,1)
        setLikes(copied);
                       
              }
    return (
        <div>
        <div className="favMain">
            {like.map((elme , i)=>{
            return ( <div key={i}>
                <div className="fav">    
           <Link  to={`/book/${elme._id}`}>
           <img className="FavImg" src={elme.img}
              alt="" />
           </Link> 
           <span className='info'>{elme.name}</span> {" "} 
           <p className='auther'>By: {elme.auther}</p>  {" "} 
           <button className='deleteFav' onClick={()=>{removeLike(elme._id)}}><RiDeleteBin5Line/></button>
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
