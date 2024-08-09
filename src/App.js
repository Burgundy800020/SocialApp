import { useEffect} from "react"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/home';
import Login from './components/login';
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
import API from "./API"


function App() {
  const dispatch = useDispatch();
  console.log("rendering app")

  const init = async () =>{
    const user = JSON.parse(sessionStorage.getItem("user"));

    if(!user || !user.token){
      dispatch(setLogin({loggedIn: false}));
      return;
    }

    const res = await API.verifyUser(user.token);
    if(res.message === "success"){
      dispatch(setEmail({email: user.email}))
      dispatch(setLogin({loggedIn: true}))
    }
    
  }

  useEffect(()=>{
    init()
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
            <Route path="/explore/:userId" element={<Explore/>}/>
            <Route path="/write" element={<Write/>}/>
            <Route path="/requests" element={<Requests/>}/>
            <Route path="/myposts" element={<MyPosts/>}/>
          </Routes>
        </BrowserRouter>  
      </div> 
  )
}

export default App;
