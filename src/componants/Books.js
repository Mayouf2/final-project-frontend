import React , {useState , useEffect  } from 'react'
import axios from 'axios'
import "./books.css"
import { AiFillBook } from 'react-icons/ai';
import { Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import { RiDeleteBin5Line } from 'react-icons/ri';








export default function Books({token}) {
    const [Books, setBooks] = useState([])
    const [findsearch , setFindsearch] = useState("")
    const [like, setLike] = useState([])
    const [rating, setRating] = useState(0)
    const [user, setUser] = useState([]);


    const { id }= useParams()

    // const  [toggleHeart, setToggleHeart] = useState(false)

    // const changeColor = () =>{
    //  setToggleHeart(!toggleHeart)
    // }




    useEffect(() => {
        const get = async () => {
         await axios.get(`${process.env.REACT_APP_BACKEND_URL}/books` , {
            headers:{authorization: "Bearer " + token},

         })
         .then(res =>{
           
           setBooks(res.data)
          //  console.log(res.data);
         })
         .catch(error => {
           console.log(error ,"err");
         })
         }
 
         get()
         
         }, [])

         useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user`,
        
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

         useEffect(async () => {
        if(token){
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/like`, {
              headers: { authorization: "Bearer " + token },
            });
            // console.log(res.data);
            setLike (res.data);
          }
          }, [like]);


       

        const searchFun = (e)=>{
    
                setFindsearch(e.target.value)
                // console.log((Books));
            
        }

        const likedHandleClick = async (id) => {
            let response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/like/${id}`, {
                
            },  
            { headers: { authorization: "Bearer " + token } }
            );
            
                console.log(response.data)
            }

        const removeLike = async (id ,i)=>{
            const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/like/${id}`,{
              headers:{authorization: "Bearer " + token},
            }
            );
        console.log(res.data);
        setLike(res);
 
              }
              const changeCoolor=(e)=>{
                setLike(!like)
              }

              const ratingChanged = (newRating) => {
      setRating(newRating);
};


const deleteBook = async (id , i)=>{
  let res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/book/${id}` , {
    headers:{authorization: "Bearer " + token},
  })

const copyArray=[...Books]
copyArray.splice(i,1)
  setBooks(copyArray)
  
}
            
    
    return (
        <div>
        
        {/* <div className="headLine">
        <h1>Books</h1>
        </div> */}
        
        <div className="sreachDiv">
        <input id='inputSearch'  type="text" placeholder="  search" onChange={(e)=>{searchFun(e)}}/>
        </div>
          
            
        <div className="booksMain">
         
        {Books.filter((elme )=>{
        if(findsearch === ""){
            return elme
        }
        else if (elme.name.toLowerCase().includes(findsearch.toLowerCase())){
            return elme
        }
      }).map((elme , i)=>{
        for(let i = 0; i < like.length ; i++) {
                if(like[i]._id === elme._id){
                  return (
                   
                   <div className="books"> 
            <Link  to={`/book/${elme._id}`}>
                <img className="bookImg" src={elme.img}
                   alt="" />
                </Link> 
                <h3>{elme.name}</h3>
                <p>By: {elme.auther}</p>
                <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                value={elme.rating}
                activeColor="#ffd700" />
                {/* <p>{elme.description}</p> */}
                {/* <p>{elme.price}</p> */}
                {/* <div id='handle'  onClick={()=>{likedHandleClick(elme._id)}}><FaHeart style={{color:"black"}} onClick={()=>{changeColor(elme._id)}} /> </div>   */}
            
                   <AiFillBook size={20} style={{color:"green"}} onClick={()=>{removeLike(elme._id)}} />
                   {user.admin == true ? (
                    <RiDeleteBin5Line onClick={()=>{deleteBook(elme._id , i)}}/>
                   ):(
                     <p></p>
                   )}
                   
                   </div>
                   
                  )
                }
               }
            return ( <div key={i}>
            <div className="books"> 
            
            <Link  to={`/book/${elme._id}`}>
                <img className="bookImg" src={elme.img}
                   alt="" />
                </Link> 
                <h3>{elme.name}</h3>
                <p>By: {elme.auther}</p>
                <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                value={elme.rating}
                activeColor="#ffd700" />
                {/* <p>{elme.description}</p> */}
                {/* <p>{elme.price}</p> */}
                {/* <div id='handle'  onClick={()=>{likedHandleClick(elme._id)}}><FaHeart style={{color:"black"}} onClick={()=>{changeColor(elme._id)}} /> </div>   */}
                <AiFillBook size={20}  style={{color:"black"}} onClick={()=>{likedHandleClick(elme._id)}} />
                {user.admin == true ? (
                    <RiDeleteBin5Line onClick={()=>{deleteBook(elme._id , i)}}/>
                   ):(
                     <p></p>
                   )}
            </div>
        </div>)
        })} 
        </div>
        </div>
    )
}

