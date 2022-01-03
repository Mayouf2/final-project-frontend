import React  , {useEffect , useState} from "react";
import "./home.css"
import { Link } from "react-router-dom";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import { FaHeart } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';


import { FaThumbsDown } from 'react-icons/fa';
import { FaThumbsUp } from 'react-icons/fa';
import { useParams } from 'react-router-dom';







export default function Home({token}) {
  const [Books, setBooks] = useState([])
  const [like , setLikes] = useState([])
  const [rating, setRating] = useState(0)


  const [posts, setposts] = useState([])
  const [bookTitle, setbookTitle] = useState("")
  const [auther, setauther] = useState("")
  const [desc, setdesc] = useState("")
  const [img, setimg] = useState("")
  const [url, seturl] = useState("")
  const [postsLikes, setPostsLikes] = useState([])
  const { id }= useParams()



  useEffect(async () => {
    if(token){
        const res = await axios.get("http://localhost:5000/like", {
          headers: { authorization: "Bearer " + token },
        });
        // console.log(res.data);
        setLikes (res.data);
      }
      }, [like]);




      useEffect(() => {
        const get = async () => {
         await axios.get('http://localhost:5000/posts' , {
            headers:{authorization: "Bearer " + token},

         })
         .then(res =>{
           
           setposts(res.data)
          //  console.log(res.data);
         })
         .catch(error => {
           console.log(error ,"err");
         })
         }
 
         get()
         
         }, [posts])
         
   const addbookTitle = (e)=>{
    setbookTitle(e.target.value)
   }      

   const addauther = (e)=>{
    setauther(e.target.value)
   }
  const addDesc = (e)=>{
    setdesc(e.target.value)
  }

  const addImage = (e)=>{
    setimg(e.target.value)
  }
  const addrating = (e)=>{
    setRating(e.target.value)
  }
  const addUrl = (e)=>{
    seturl(e.target.value)
  }

  const addPost = async()=>{
    if(!desc && !img ){
        return;
      }
      const res = await axios.post("http://localhost:5000/posts" , {
          desc:desc ,
          img:img,
          bookTitle:bookTitle,
          auther:auther,
          rating:rating,
          url:url
      },
      {
        headers:{authorization: "Bearer " + token},
        }
        )
        setposts(res.data)
}

const deletePost = async (id, i)=>{
const deletePost = await axios.delete(`http://localhost:5000/posts/${id}` , 
{
        headers:{authorization: "Bearer " + token},
        }
);
const copiedArr= [...posts];
copiedArr.splice(i,1);
setposts(copiedArr);
console.log(copiedArr);
}

         const likedHandleClick = async (id) => {
            let response = await axios.post(`http://localhost:5000/like/${id}`, {
                
            },  
            { headers: { authorization: "Bearer " + token } }
            );
            
                console.log(response.data)
            }

      const ratingChanged = (newRating) => {
      console.log(newRating);       
};
const result = Object.values(posts);

// console.log(result);
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
           <span >By: {elme.auther}</span>  {" "} <br />
           <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                value={elme.rating}
                activeColor="#ffd700" />
           </div> 
       </div>
            
        </div>)
        })}
      </div>



      <div className="rightSide">
      <h2>Reviews</h2>
      {posts.map((elme , i)=>{
            return ( <div key={i}>
            <div className="HomePosts"> 
            
                <img className="HomebookImg" src={elme.img}
                   alt="" />
                
                <img src={elme.user.img} alt="" className="HomeIgm"/>
                <span className="HomeUserInfo">{elme.user.name}</span>
                <h4 className="HomeBookInfo">{elme.bookTitle}</h4>
                <h4 className="HomeBookInfo">By: {elme.auther}</h4>
                <div className="stars">
                <ReactStars
                count={5}
                onChange={ratingChanged}
                size={20}
                value={elme.rating}
                activeColor="#ffd700" />
                </div>
                <a href={elme.url} target="_blank" className="url">want to read?</a>
                <h3 className="HomeDesc">{elme.desc}</h3>
                <p className="time">{elme.time}</p>
                <div>
                 <p> 

                 </p>
                </div>
                <div className="HomeLikeButton">
                {/* <FaHeart style={{color:"black"}} onClick={()=>{likedHandleClick(elme._id)}} /> */}
                <h6 className="hide"></h6>
                <RiDeleteBin5Line className="deletePostButton" onClick={()=>{deletePost(elme._id)}}/>

                </div>
            </div>
        </div>)
        })} 
      </div>
      <div className="center">
      <div className="formbox1">
            <h1>Review a book</h1>
            <form id="form" >
            <label for="">Title</label>
            <input type="text" className="asd" placeholder='Title' onChange={(e)=>{addbookTitle(e)}}/>
            <label for="">Auther</label>
            <input type="text" className="asd" placeholder='Auther' onChange={(e)=>{addauther(e)}}/>
            <label for="">Image</label>
            <input type="text" className="asd" placeholder='image'  onChange={(e)=>{addImage(e)}}/>
            <label for="">Link</label>
            <input type="text" className="asd" placeholder='book link'  onChange={(e)=>{addUrl(e)}}/>
            <label for="">Review</label>
            <textarea name="" id="" cols="51" rows="5" placeholder="Review" onChange={(e)=>{addDesc(e)}}></textarea>
            <label for="">Rating</label>
            {/* <input type="text" className="asd" placeholder='Rating'  onChange={(e)=>{addrating(e)}}/> */}
            <select id="cars" name="cars" onChange={(e)=>{addrating(e)}}>
    <option value="0">Rate:</option>
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    <option>5</option>
  </select> <br />
            <button type="button" className="addButton" onClick={()=>{addPost()}}>Add</button>
            </form>
            </div>
      </div>
      </div>
      
    </div>
    
  );
}
