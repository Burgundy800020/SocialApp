import {useState, useEffect} from "react"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/home'
import Login from './components/login'
import Signup from './components/signup'
import Posts from "./components/posts"
import Explore from "./components/explore"
import Write from "./components/write"
import MyPosts from "./components/myPosts"
import Requests from "./components/requests"
import  NavBar from './components/navBar'
import { useDispatch } from "react-redux"
import { setLogin, setEmail } from "./slices/userSlice"
import './App.css'


function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    const user = JSON.parse(sessionStorage.getItem("user"))
    if(!user || !user.token){
      dispatch(setLogin({loggedIn: false}));
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
      if(r.message === "success"){
        dispatch(setLogin({loggedIn:true}))
        dispatch(setEmail({email: user.email}))
      }
    })
  }, []);
  
  return (
      <div className="App">
        <BrowserRouter>
          <NavBar/>     
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/posts" element={<Posts/>}/>
            <Route path="/explore" element={<Explore/>}/>
            <Route path="/write" element={<Write/>}/>
            <Route path="/requests" element={<Requests/>}/>
            <Route path="/myposts" element={<MyPosts/>}/>
          </Routes>
        </BrowserRouter>  
      </div> 
  )
}

export default App;
