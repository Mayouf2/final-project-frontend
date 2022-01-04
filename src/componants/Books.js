import React , {useState , useEffect  } from 'react'
import axios from 'axios'
import "./books.css"
import { FaHeart } from 'react-icons/fa';
import { Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';






export default function Books({token}) {
    const [Books, setBooks] = useState([])
    const [findsearch , setFindsearch] = useState("")
    const [like, setLike] = useState([])
    const { id }= useParams()

    // const  [toggleHeart, setToggleHeart] = useState(false)

    // const changeColor = () =>{
    //  setToggleHeart(!toggleHeart)
    // }




    useEffect(() => {
        const get = async () => {
         await axios.get('http://localhost:5000/books' , {
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

         useEffect(async () => {
        if(token){
            const res = await axios.get("http://localhost:5000/like", {
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
            let response = await axios.post(`http://localhost:5000/like/${id}`, {
                
            },  
            { headers: { authorization: "Bearer " + token } }
            );
            
                console.log(response.data)
            }

        const removeLike = async (id ,i)=>{
            const res = await axios.delete(`http://localhost:5000/like/${id}`,{
              headers:{authorization: "Bearer " + token},
            });
        console.log(res.data);
        setLike(res);
 
              }
              const changeCoolor=(e)=>{
                setLike(!like)
              }
            
    
    return (
        <div>
        
        <div className="headLine">
        <h1>Books</h1>
        </div>
        
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
                   
                   <div className="book"> 
            <Link  to={`/book/${elme._id}`}>
                <img className="bookImg" src={elme.img}
                   alt="" />
                </Link> 
                <h3>{elme.name}</h3>
                <p>By: {elme.auther}</p>
                {/* <p>{elme.description}</p> */}
                {/* <p>{elme.price}</p> */}
                {/* <div id='handle'  onClick={()=>{likedHandleClick(elme._id)}}><FaHeart style={{color:"black"}} onClick={()=>{changeColor(elme._id)}} /> </div>   */}
            
                   <FaHeart style={{color:"red"}} onClick={()=>{removeLike(elme._id)}} />
                   </div>
                   
                  )
                }
               }
            return ( <div key={i}>
            <div className="book"> 
            
            <Link  to={`/book/${elme._id}`}>
                <img className="bookImg" src={elme.img}
                   alt="" />
                </Link> 
                <h3>{elme.name}</h3>
                <p>By: {elme.auther}</p>
                {/* <p>{elme.description}</p> */}
                {/* <p>{elme.price}</p> */}
                {/* <div id='handle'  onClick={()=>{likedHandleClick(elme._id)}}><FaHeart style={{color:"black"}} onClick={()=>{changeColor(elme._id)}} /> </div>   */}
                <FaHeart style={{color:"black"}} onClick={()=>{likedHandleClick(elme._id)}} />
            </div>
        </div>)
        })} 
        </div>
        </div>
    )
}

