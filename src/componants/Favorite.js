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

    useEffect(() => {
            axios.get(`http://localhost:5000/like` , 
        {headers: { authorization: "Bearer " + token },
    }
    )
        .then(res =>{
          setLikes(res.data)
//   console.log("likes",res.data)
        })
        .catch(err => {
          console.log(err);
        }) 
        
    
    }, [like])

    const removeLike = async (id ,i)=>{
            const res = await axios.delete(`http://localhost:5000/like/${id}`,{
              headers:{authorization: "Bearer " + token},
            });
        console.log(res.data);
        const copied = [...like]
        copied.splice(i,1)
        setLikes(copied);
            // setLikes(res);
           
            
              }
    

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
        <h1> </h1>
        <div className="favMain">
            {like.map((elme , i)=>{
            return ( <div key={i}>
                <div className="fav">    
           <Link  to={`/book/${elme._id}`}>
           <img className="FavImg" src={elme.img}
              alt="" />
           </Link> 
           
           <span>{elme.name}</span> {" "} 
           <span>By: {elme.auther}</span>  {" "} 
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
