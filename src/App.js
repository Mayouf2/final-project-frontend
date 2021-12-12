import React , {useState , useEffect} from "react";
import { Route , BrowserRouter} from "react-router-dom";
import Home from "./componants/Home";
import Books from "./componants/Books";
import Favorite from "./componants/Favorite";
import LogIn from "./componants/Login";
import Header from "./componants/Header";
import SignUp from "./componants/SignUp"
import OneBook from "./componants/OneBook"
function App() {
  const [token, setToken] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("token");
    const initialValue = JSON.parse(saved);
    return initialValue ; });



  useEffect(() => {
    // storing input name
    localStorage.setItem("token", JSON.stringify(token));
  }, [token]);

  return (
    
    
    <div className="App">
    
    <BrowserRouter>
    <Header token={token} setToken={setToken}/>
      <Route exact path="/" component={Home} />
      <Route exact path="/Books" render={()=>{return <Books token={token}/>}} />
      <Route exact path="/Favorite" component={Favorite} />
      <Route exact path="/login"  render={()=>{return <LogIn setToken={setToken}/>}}/>
      <Route exact path="/SignUp" component={SignUp} />
      <Route exact path="/OneBook" component={OneBook} />
      <Route path="/book/:id" component={OneBook}/>
      
      </BrowserRouter>
    
    </div>
  );
}

export default App;
