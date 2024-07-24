import '../styles/posts.css';
import {useState, useEffect, memo} from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Post from "./widgets/post.js"

export default function MyPosts(){
    const [posts, setPosts] = useState([])
    const loggedIn = useSelector((state)=>state.user.loggedIn)
    const email = useSelector((state)=>state.user.email)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function fetchPosts(reqInfo){
      try{
        let res = await fetch('http://localhost:3080/api/myposts', {
          method: 'POST',
          headers : {
            'Content-Type': 'application/json'
          },
          body : JSON.stringify(reqInfo)
        })
        res = await res.json()
        if(res.message === "success"){
          setPosts(res.data);
        }
      }
      catch{

      }
    }

    useEffect(()=>{
      fetchPosts({user:email})
    }, [])
    
    return(
    <div className='Posts'>
      <header className="App-header">
        My Posts
      </header>
      <div>{posts.length}</div>
      <div className='postsContainer'>
            {loggedIn? posts.map(x => {
                return <Post author={x.author} date={x.date} content={x.content}/>
              }) : "Please login first"}
      </div>
      <div className='bottomLeft'>
        <input type="button" value="To home" onClick={()=>{navigate("../")}}></input>
      </div>
    </div>)
}