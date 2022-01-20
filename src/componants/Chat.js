import React ,{ useState ,useEffect} from 'react'
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import { useParams } from 'react-router-dom'
import axios from 'axios';
import "./Chat.css"

const socket = io.connect(`${process.env.REACT_APP_BACKEND_URL}` , { transports : ['websocket'] });


let room = ""
const hiddChaild=true
export default function Chat({token}) {
  const [userName, setUserName] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  // const [userImg, setuserImg] = useState("")
  const {id,name}=useParams()

    

    const [userId, setUserId] = useState("")
    // const [userName, setuserName] = useState("")



    
  useEffect(() => {
    if(id>userId){
      const sum=id+userId
    room = sum

    }else{
      const sum=userId+id
      room = sum
  
    }


    const getMessage=async()=>{
      console.log(room,"inget");
      const res1= await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getChat/${room}`)

        setMessageList(res1.data.chatArr)
      
    }
    getMessage()

    const joinRoom = () => {
      console.log(room ,"room");
      if (room !== "") {
        socket.emit("join_room", room);
        
      }
    };
    joinRoom()
  /////////////////////

  }, [])
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/user`,
    
    {headers: { authorization: "Bearer " + token },
    },

    )
   
    .then(res =>{
        setUserName(res.data.name);
        // setuserImg(res.data.img)
        // console.log(res.data.name);
      
    })
    .catch(err => {
      console.log(err);
    })

    
}, [])



  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        userName:userName ,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };


      const res= await axios.post(`${process.env.REACT_APP_BACKEND_URL}/saveChat`,{
        room: room,
        userName:userName ,
        message: currentMessage,
        recipient:id,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
          
      },
        { headers: { authorization: `Bearer ${token}` },
      })
      console.log(res.data);
      console.log(res.data.chatArr);
      // setUserName(res.userName)
      // console.log(res.userName);


      await socket.emit("send_message", messageData);
      setMessageList( [...messageList, messageData]);
      setCurrentMessage("");
    }


 
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

// console.log(userName);
// console.log(userId);


  return (
  <div className="App">
 <div className="chat-window">


    <div className="chat-header">
      <p>discussion</p>
    </div>
    <div className="chat-body">
      <ScrollToBottom className="message-container">
        {messageList.map((elme) => {
      
          return (
            <div
              className="message"
              id={userName === elme.userName ? "you" : "other" && userId === elme.userId ? "you" : "other"}>
              <div>
              {/* <img src={userImg} alt="" className='useimg'/> */}
                <div className="message-content">
                  <p>{elme.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{elme.time}</p>
                  <p id="author">{elme.userName}</p>
                </div>
              </div>
            </div>
          );
        })}
      </ScrollToBottom>
    </div>
    <div className="chat-footer">
      <input
        type="text"
        value={currentMessage}
        placeholder="Sand Message..."
        onChange={(event) => {
          setCurrentMessage(event.target.value);
        }}
        onKeyPress={(event) => {
          event.key === "Enter" && sendMessage();
        }}
      />
      <button onClick={sendMessage}>&#9658;</button>
    </div>
    </div>
    </div>

)}  