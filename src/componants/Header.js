import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Header.css";

export default function Header({ token, setToken }) {
  const [user, setUser] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/user`, {
        headers: { authorization: "Bearer " + token },
      })
      .then((res) => {
        setUser(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user, token]);
  return (
    <div>
          {token ? (
            <div className="navitems">
            <div className="brand">
            <img className="logo" src="https://www.thesecret.tv/wp-content/uploads/2020/04/icon-books-578x384.png"/>
             <h1 className="title">Title</h1>
            </div>
              <Link id="navLink" to="/">
                Home{" "}
              </Link>
              <Link id="navLink" to="/Books">
                Books
              </Link>
              <Link id="navLink" to="/Favorite">
                My books
              </Link>
              {/* <Link id="navLink" to="/UserProfile">
                Members
              </Link> */}

              <div class="dropdown">
                <img className="accountImg" src={user.img} alt="" />
                <span>{user.name}</span>
                <div class="dropdown-content">
                  <Link className="dro" to="/Profile">
                    Profile
                  </Link>

                  {user.admin == true ? (<Link className="dro" to="/AddBook">
                  Admin dashboard
                  </Link>):(
                  <h1> </h1>
                  )}
                    
                  <Link
                    className="dro"
                    className="link"
                    to="/login"
                    onClick={() => {
                      setToken("");
                    }}
                  >
                    Log out
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="navitems">
            <div className="brand">
            <img className="logo" src="https://www.thesecret.tv/wp-content/uploads/2020/04/icon-books-578x384.png"/>
             <h1 className="title">Title</h1>
            </div>
              <Link id="navLink" to="/">
                Home
              </Link>
              <Link id="navLink" to="/Books">
                Books
              </Link>
              <Link id="navLink" to="/Login">
                Login
              </Link>
              <Link id="navLink" to="/SignUp">
                SignUp
              </Link>
            </div>
          )}
        </div>
  );
}
