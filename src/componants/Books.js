import React , {useState , useEffect  } from 'react'
import axios from 'axios'
import "./books.css"
import { FaHeart } from 'react-icons/fa';
import { Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';






export default function Books({token}) {
    const [Books, setBooks] = useState([])
    const [findsearch , setFindsearch] = useState("")
    const [changeLikeColor, setChangeLikeColor] = useState(false)
    const [like, setLike] = useState(false)
    const { id }= useParams()




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
         
         }, [])


       

        const searchFun = (e)=>{
    
                setFindsearch(e.target.value)
                console.log((Books));
            
        }

        const likedHandleClick = async (id) => {
            let response = await axios.post(`http://localhost:5000/like/${id}`, {
                
            },  
            { headers: { authorization: "Bearer " + token } }
            );
        
                console.log(response.data.Like)
            }
            

        // function toggleColor(_id){
        //     const arrCopy = [...Books]
        //     if (arrCopy[_id-1].like == "black"){
        //         arrCopy[_id-1].like = "red"
        //     }else{
        //         arrCopy[_id-1].like = "black"
        //     }
        //     setBooks(arrCopy)
        //     console.log(arrCopy);
        // }
    
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
        else if (elme.name.toLowerCase().includes(findsearch.toLocaleLowerCase())){
            return elme
        }
      }).map((elme , i)=>{
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
                <div id='handle'  onClick={()=>{likedHandleClick(elme._id)}}><FaHeart id='icon' style={{color:elme.like}} /> </div>
                
            </div>
            
        </div>)
        })}
            
        </div>
        
        </div>
    )
}

