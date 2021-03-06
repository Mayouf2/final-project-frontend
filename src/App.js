import React , {useState , useEffect} from "react";
import { Route , BrowserRouter} from "react-router-dom";
import Home from "./componants/Home";
import Books from "./componants/Books";
import Favorite from "./componants/Favorite";
import LogIn from "./componants/Login";
import Header from "./componants/Header";
import SignUp from "./componants/SignUp"
import OneBook from "./componants/OneBook"
import Profile from "./componants/Profile"
import AddBook from "./componants/AddBook"
import Chat from "./componants/Chat"
import UserProfile from "./componants/UserProfile";
require("dotenv").config();

function App() {
  console.log(process.env.REACT_APP_BACKEND_URL , "backend url");
  const [token, setToken] = useState(() => {
    const saved = localStorage.getItem("token");
    const initialValue = JSON.parse(saved);
    return initialValue ; });



  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
  }, [token]);

  return (
    
    
    <div className="App">
    
    <BrowserRouter>
    <Header token={token} setToken={setToken}/>
      <Route exact path="/" render={()=>{return <Home token={token} setToken={setToken}/>}}/>
      <Route exact path="/Books" render={()=>{return <Books token={token}/>}} />
      <Route exact path="/Favorite"  render={()=>{return <Favorite token={token}/>}} />
      <Route exact path="/login"  render={()=>{return <LogIn setToken={setToken}/>}}/>
      <Route exact path="/SignUp" component={SignUp} />
      <Route exact path="/OneBook"  render={()=>{return <OneBook token={token}/>}} />
      <Route path="/book/:id"  render={()=>{return <OneBook token={token}/>}}/>
      <Route path="/Profile" render={()=>{return <Profile token={token} setToken={setToken}/>}}/>
      <Route exact path="/AddBook" render={()=>{return <AddBook token={token}  />}}/>
      <Route exact path="/Chat/:id/:name" render={()=>{return <Chat token={token}  />}}/>
      <Route exact path="/UserProfile/:id/:name" render={()=>{return <UserProfile token={token}  />}}
/>

      {/* render={()=>{return <UserProfile token={token}  />}} */}


      



      
      </BrowserRouter>
    
    </div>
  );
}

export default App;
