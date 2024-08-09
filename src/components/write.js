import '../styles/write.css';
import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDraft } from '../slices/draftSlice';

export default function Write(){
    const [err, setErr] = useState("")
    const [confirmation, setConfirmation] = useState("")
    const email = useSelector((state)=>state.user.email)
    const loggedIn = useSelector((state)=>state.user.loggedIn)
    const draft = useSelector((state)=>state.draft.text)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function onWrite(ev){
        if(draft.length < 500)dispatch(setDraft({text:ev.target.value}))
    }

    async function onPost(ev){
        if(loggedIn !== true){
          setErr("Not logged in")
          return
        }
        const r = await post({email: email, content:draft})
        if(r.message === "success"){
          setConfirmation("Posted!")  
          setTimeout(()=>{setConfirmation("")}, 4000)
        }
    }

    async function post(reqInfo){
      const res = await fetch('http://localhost:3080/api/post', {
        method: 'POST',
        headers : {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(reqInfo)
      })
      const data =  await res.json()
      return data
    }

    return(
    <div className='Write'>
      <header className="App-header">
        Write New Post
      </header>
      <div className='writeBox'>
        <textarea className="postContent inheritWidth" onChange={onWrite}>{draft}</textarea>
        <input type="button" className="inheritWidth" value="post" onClick={onPost}></input>
        <label className='error'>{err}</label>
        <label className='confirmation'>{confirmation}</label>
      </div>
      <div className='bottomLeft'>
        <input type="button" value="To home" onClick={()=>{navigate("../")}}></input>
      </div>
    </div>
    )
}