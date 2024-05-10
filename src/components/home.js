import {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

function Home(props) {
  const {loggedIn, email, setLoggedIn} = props;
  const navigate = useNavigate();
  const toLogin = (e)=>{
    if(!loggedIn)navigate("/login");
    else {
      setLoggedIn(false);
      sessionStorage.setItem("user", null);
    }
  };
  return (
    <div className='Home'>      
      <div className="App-header">
        Home
      </div>
      <div className='App-body'>
        <div className='homeButtonContainer'>
            <input type="button" className='homeLoginButton' onClick={toLogin} value={loggedIn?"Log out":"Log in"}></input>
        </div>
        <div>{loggedIn? "Logged in as "+email : " "}</div>
      </div>
    </div>
  );
}

export default Home;
