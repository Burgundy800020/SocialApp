import React from "react";
import { Link } from "react-router-dom";
import "../styles/navBar.css"

const NavBar = ()=>{
    return(
    <nav className="navbar navbar-expand-lg navbar-expand-md navbar-dark bg-primary">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="./">
              <div className={"nav-link"}>
                Home
              </div>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="./login">
              <div className={"nav-link"}>
                Login
              </div>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signup">
              <div className={"nav-link"}>
                Signup
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
    )
}

export default NavBar