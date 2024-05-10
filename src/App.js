import {useState, useEffect} from "react"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/home'
import Login from './components/login'
import Signup from './components/signup'
import  NavBar from './components/navBar'
import './App.css'

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  
  useEffect(()=>{
    const user = JSON.parse(sessionStorage.getItem("user"));
    if(!user || !user.token){
      setLoggedIn(false);
      return;
    }
    fetch("http://localhost:3080/api/verify", {
      method : 'POST', 
      headers:{
        'jwt-token' : user.token
      }
    })
    .then((r)=>r.json())
    .then((r)=>{
      setLoggedIn(r.message === 'success');
      setEmail(user.email || '');
      console.log("user.email: " + user.email);
    })
  }, []);
  
  return (
      <div className="App">
        <BrowserRouter>
          <NavBar/>     
          <Routes>
            <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
            <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail}/>}/>
            <Route path="/signup" element={<Signup setLoggedIn={setLoggedIn} setEmail={setEmail}/>}/>
          </Routes>
        </BrowserRouter>  
      </div>
    
  )
}

export default App;
