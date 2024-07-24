import '../../styles/posts.css'
import '../../styles/explore.css'
import '../../styles/requests.css'
import {useState, useEffect, useMemo, memo} from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FollowRequest from "./followRequest.js"

export default function RequestMenu(){
    const [profiles, setProfiles] = useState([])
    const [fetchCnt, setFetchCnt] = useState(0)
    const loggedIn = useSelector((state)=>state.user.loggedIn)
    const email = useSelector((state)=>state.user.email)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function fetchRequests(reqInfo){
      let res 
      try{
        res = await fetch('http://localhost:3080/api/requests', {
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

    const getResponse=(target)=>async(action)=>{
        let res 
      try{
        res = await fetch('http://localhost:3080/api/confirm', {
          method: 'post',
          headers : {
            'Content-Type': 'application/json'
          },
          body : JSON.stringify({source:email, target:target, action:action})
        })
        res = await res.json()
        if(res.message === "success"){
         setFetchCnt(fetchCnt+1)
        }
      }
      catch(err){
        console.error(err)
      }
    }

    useEffect(()=>{
      fetchRequests({user:email})
    }, [fetchCnt])
    
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    return(
    <div className='dropdown'>
       <button onClick={toggleDropdown} className="dropdown-button">
        Follow Requests
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
           {loggedIn? profiles.map(x => {
                return <li><FollowRequest email={x} 
                 onConfirm={getResponse(x)}/></li> 
              }) : "Please login first"}
        </ul>
      )}
    </div>)
}
