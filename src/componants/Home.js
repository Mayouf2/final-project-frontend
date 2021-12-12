import React from "react";
import "./home.css"
import { Link } from "react-router-dom";



export default function Home() {
  return (
    <div >
    <div className="homeLine">
    <h1>Home</h1>
    </div>
    <div className="mainCata">
    <Link  to={`/books`}>
       <div className="homeCata">
         <h2 className="line">Books</h2>
         <img className="cataImg" src="https://st4.depositphotos.com/8852212/31364/i/600/depositphotos_313646770-stock-photo-panorama-blurred-bookshelf-many-old.jpg" alt="" />
         
       </div>
       </Link >
       <div className="homeCata">
         <h2  className="line2">cata2</h2>
         <img className="cataImg" src="https://st4.depositphotos.com/8852212/31364/i/600/depositphotos_313646770-stock-photo-panorama-blurred-bookshelf-many-old.jpg" alt="" />
         
       </div>
    
    </div>
      
    </div>
  );
}
