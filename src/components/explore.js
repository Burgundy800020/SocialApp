import '../styles/posts.css';
import '../styles/explore.css'
import '../styles/basic.css'
import {useState, useEffect, useMemo} from "react";
import { useParams, Link} from 'react-router-dom';
import {useSelector } from 'react-redux';
import Profile from "./widgets/profile.js"
import Post from "./widgets/post.js"
import RequestMenu from './widgets/requestsMenu.js';

export default function Explore(){
    const [profiles, setProfiles] = useState([])
    const [word, setWord] = useState("")
    const [key, setKey] = useState("")
    const [fetchCnt, setFetchCnt] = useState(0)
    const loggedIn = useSelector((state)=>state.user.loggedIn)
    const email = useSelector((state)=>state.user.email)
    
    const {userId = 0} = useParams()
    const [fetched, setFetched] = useState(false)
    
    async function fetchProfiles(reqInfo){
      let res 
      try{
        res = await fetch('http://localhost:3080/api/explore', {
          method: 'post',
          headers : {
            'Content-Type': 'application/json'
          },
          body : JSON.stringify(reqInfo)
        })
        res = await res.json()
        if(res.message === "success"){
          setProfiles(res.data);
        }
      }
      catch(err){
        console.error(err)
      }
    }

    async function getFollow(target, action){
      if(action === "requested")return
      let res 
      try{
        res = await fetch(`http://localhost:3080/api/follow`, {
          method: 'post',
          headers : {
            'Content-Type': 'application/json'
          },
          body : JSON.stringify({source:email, target:target, action:action})
        })
        res = await res.json()
        if(res.message === "success"){
          setFetchCnt(cnt=>cnt+1)
        }
      }
      catch(err){
        console.error(err)
      }
    }  

    useEffect(()=>{
      if(userId === 0)fetchProfiles({user:email})
    }, [fetchCnt])
    
    const onTypeWord = (ev) => {
      setWord(ev.target.value)
    }

    const onSearch = (ev) =>{
      setKey(word)
    }

    const filteredProfiles = useMemo(() => {
        return profiles.filter((profile) =>
            profile.email.toLowerCase().includes(key.toLowerCase()))
    }, [key, profiles]
    )

    let selectedUser = false
    const [selectedPosts,setSelectedPosts] = useState([])

    async function getProfilePage(reqInfo){
      let res 
      try{
        res = await fetch(`http://localhost:3080/api/profilepage`, {
          method: 'post',
          headers : {
            'Content-Type': 'application/json'
          },
          body : JSON.stringify(reqInfo)
        })
        res = await res.json()
        if(res.message === "success"){
          setFetched(true)
          setSelectedPosts(res.data)
        }
      }
      catch(err){
        console.error(err)
      }
    }  
   
    if(userId !== 0){
        selectedUser = profiles.filter(user=> user._id === userId)[0]
        if(selectedUser && !fetched)getProfilePage({user:selectedUser.email})
    }
  
    function renderExplore(){
      return (<div className='rowFlex'>
        <div>
        <div className='SearchBar'>
          <input type="text" value={word} onChange={onTypeWord}></input>
          <button onClick={onSearch}>Search</button>
        </div>
        <div className='PostsContainer'>
              {loggedIn? filteredProfiles.map(x => {
                  return <Profile email={x.email} followed={x.followed} requested={x.requested} id={x._id}
                   onFollow={()=>{getFollow(x.email, x.requested?"requested":(x.followed?"unfollow":"follow"))}}/>
                }) : "Please login first"}
        </div>
        </div>
        <div className='bottomLeft requestMenu'>
        <RequestMenu/>
      </div>
        </div>)
    }

  function renderProfilePage() {
    return (<div className='postsContainer'>
      {selectedPosts.map(x => {
        return <Post author={x.author} date={x.date} content={x.content} />
      })}
    </div>)
  }
    return(
    <div className='Posts'>
      <header className="App-header">
      {selectedUser?selectedUser.email:"Explore"}
      </header>
      <div className='rowFlex'>
      {selectedUser?renderProfilePage(selectedUser) : renderExplore()}
      
      </div>
    </div>)
}
