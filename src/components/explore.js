import '../styles/posts.css';
import '../styles/explore.css'
import '../styles/basic.css'
import {useState, useEffect, useMemo, memo} from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Profile from "./widgets/profile.js"
import RequestMenu from './widgets/requestsMenu.js';

export default function Explore(){
    const [profiles, setProfiles] = useState([])
    const [word, setWord] = useState("")
    const [key, setKey] = useState("")
    const [fetchCnt, setFetchCnt] = useState(0)
    const loggedIn = useSelector((state)=>state.user.loggedIn)
    const email = useSelector((state)=>state.user.email)
    const dispatch = useDispatch()
    const navigate = useNavigate()

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
      console.log("fetching")
      fetchProfiles({user:email})
    }, [fetchCnt])
    
    const onTypeWord = (ev) => {
      setWord(ev.target.value)
    }

    const onSearch = (ev) =>{
      setKey(word)
    }

    const filteredProfiles = useMemo(() => {
        //console.log("filtering")
        return profiles.filter((profile) =>
            profile.email.toLowerCase().includes(key.toLowerCase()))
    }, [key, profiles]
    )
    
    return(
    <div className='Posts'>
      <header className="App-header">
        Explore
      </header>
      <div className='rowFlex'>
      <div></div>
      <div>
      <div>{profiles.length}</div>
      <div className='SearchBar'>
        <input type="text" value={word} onChange={onTypeWord}></input>
        <button onClick={onSearch}>Search</button>
      </div>
      <div className='PostsContainer'>
            {loggedIn? filteredProfiles.map(x => {
                return <Profile email={x.email} followed={x.followed} requested={x.requested}
                 onFollow={()=>{getFollow(x.email, x.requested?"requested":(x.followed?"unfollow":"follow"))}}/>
              }) : "Please login first"}
      </div>
      </div>
      <div className='bottomLeft requestMenu'>
        <RequestMenu/>
      </div>
      </div>
    </div>)
}
