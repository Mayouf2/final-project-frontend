import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {AiOutlineHeart} from 'react-icons/all';
import "./Games.css";
export default function Games({token}) {
    const [game, setGame] = useState([])
    const [name, setname] = useState("");
    const [img, setimg] = useState("");
    const [video, setVideo] = useState('');
    const [like, setLike] = useState([]);
    const [description, setDescription] = useState('');
    const history = useHistory();
    useEffect(async () => {
      const res = await axios.get("http://localhost:5000/games", {
        headers: { authorization: "Bearer " + token },
      });
      console.log(res.data);
      setGame(res.data);
       if(token){
        const result = await axios.get("http://localhost:5000/Like", {
          headers: { authorization: "Bearer " + token },
        });
        console.log(result.data);
        setLike (result.data);
      }
    }, []);
    const gotGame=(id)=>{
        history.push(`/Game/${id}`)
    }
    const changeName=(e)=>{
      setname(e.target.value)
    }
    const changeImg=(e)=>{
      setimg(e.target.value)
    }
    const changeVideo=(e)=>{
      setVideo(e.target.value)
    }
    const changeDescription=(e)=>{
      setDescription(e.target.value)
    }
    const addGame=async()=>{
      const result = await axios.post("http://localhost:5000/games",{name,img,video,description},{
        headers: { authorization: "Bearer " + token },
      })
      const copyArray=[...game]
      copyArray.push(result.data)
      setGame(copyArray)
    }
  const deleteGame=async(id,i)=>{
const result = await axios.delete(`http://localhost:5000/games/${id}`,{
  headers: { authorization: "Bearer " + token },
})
const copyArray=[...game]
copyArray.splice(i,1)
setGame(copyArray)
  }
//
const addLike= async(id)=>{
  const result = await axios.post(`http://localhost:5000/Like/${id}`,{},{
    headers: { authorization: "Bearer " + token },
  })
 try {
  // setLike(result.data)
 } catch (error) {
   console.log(error);
 }
}
// const delteLike=async(id)=>{
//   const result = await axios.delete(`http://localhost:5000/Like/${id}`,{
//     headers: { authorization: "Bearer " + token },
//   })
//  try {
// setLike(result.data)
//  } catch (error) {
//    console.log(error);
//  }
// }
const changeCoolor=(e)=>{
  setLike(!like)
}
//

    return (
        <div className="Gamediv">
          <input type="text" className='input' placeholder='Name' onChange={(e)=>{changeName(e)}}/>
          <br />
          <input type="text" className='input' placeholder='Img' onChange={(e)=>{changeImg(e)}}/>
          <br />
          <input type="text" className='input' placeholder='Description' onChange={(e)=>{changeDescription(e)}}/>
          <br />
          <input type="text" className='input' placeholder='Video' onChange={(e)=>{changeVideo(e)}}/>
          <br />
          <button onClick={()=>{addGame()}} className='add'>add game</button>
         {game.map((elm,i)=>{
              for(let index = 0; index < like.length ; index++) {
                console.log(like[index],"liked");
                if(like[index]._id==elm._id){
                  return (
                    <div>
                   <br />
                   <FaHeart style={{color:"red"}} onClick={()=>{addLike(elm._id);changeCoolor()}} />

                    <button onClick={()=>{deleteGame(elm._id,i)}}>remove game</button> 
                    </div>        
                  )
                }
               }
               return (
                <div>
                 {/* <div  className='divOnclick' onClick={() => {
                   gotGame(elm._id);
                     }} key={i}>
                   <p>{elm.name}</p>
                   <img src={elm.img} className='imgGame' alr="no img" />   
                  </div> */}
               <br />
               <FaHeart style={{color:"gray"}} onClick={()=>{addLike(elm._id);changeCoolor()}} />
                <button onClick={()=>{deleteGame(elm._id,i)}}>remove game</button> 
                </div>        
              )
            
         })}
        </div>
    )
}