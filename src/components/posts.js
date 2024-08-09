import '../styles/posts.css';
import {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Post from "./widgets/post.js"

export default function Posts(){
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const pixPerPage = 1000
    const [scroll, setScroll] = useState(0.0)
    const loggedIn = useSelector((state)=>state.user.loggedIn)
    const email = useSelector((state)=>state.user.email)
    const navigate = useNavigate()

    async function fetchPosts(reqInfo){
      try{
        let res = await fetch('http://localhost:3080/api/feed', {
          method: 'POST',
          headers : {
            'Content-Type': 'application/json'
          },
          body : JSON.stringify(reqInfo)
        })
        res = await res.json()
        if(res.message === "success"){
          setPosts([...posts, ...res.data]);
        }
      }
      catch{

      }
    }

    useEffect(()=>{
      fetchPosts({page:page, user:email})
    }, [page])
    
    const handleScroll = (ev) => {
      setScroll(ev.target.scrollTop)
      if(scroll >= page*pixPerPage){setPage(page+1)}
    };

    return(
    <div className='Posts'>
      <header className="App-header">
        Posts
      </header>
      <div className='postsContainer'  onScroll={handleScroll}>
            {loggedIn? posts.map(x => {
                return <Post author={x.author} date={x.date} content={x.content}/>
              }) : "Please login first"}
      </div>
      <div className='bottomLeft'>
        <input type="button" value="To home" onClick={()=>{navigate("../")}}></input>
      </div>
    </div>)
}

//HOC
export const withDelete = (Component, handleDelete) => props =>{
  return <div>
    <Component props={props}></Component>
    <button onClick={handleDelete}>X</button>
  </div>
}

