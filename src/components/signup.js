import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector  } from 'react-redux';
import { addUser } from '../slices/userSlice';

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const loggedIn = useSelector((state)=>state.user.loggedIn)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  async function getSignup(){
    const r = await dispatch(addUser({email, password})).unwrap()
    setEmailErr("")
    setPasswordErr("")
    if(r.message === 'success'){
      navigate("../")
      return
    }
    else if(r.message === 'taken'){
      setEmailErr("User with this email already exists")
      return
    }
  }
  
  function onSignup(ev){
    setEmailErr("");
    setPasswordErr("");
    if(loggedIn){
      setEmailErr("Please log out first")
      return
    }
    if(email === ''){
      setEmailErr('Enter an email');
      return;
    }
    if(!(/^[A-z]/.test(email) && /\w{2,4}$/.test(email) && /@/.test(email))){
      setEmailErr('Enter a valid email');
      return;
    }
    if(password.length < 4){
        setPasswordErr("Password must be at least 4 characters");
        return;
    }
    getSignup();
  }
  return (
    <div className='Login'>
      <header className="App-header">
        Sign Up
      </header>
      <div className='loginBox'>
          <div className="inputContainer">
            Username:  
            <input type="text" className="loginInput" onChange={(ev)=>{setEmail(ev.target.value)}}></input>
          </div>
          <label className='error'>{emailErr}</label>
          <div className="inputContainer">
            Password:  
            <input type="text" className="loginInput" onChange={(ev)=>{setPassword(ev.target.value)}}></input>
          </div>
          <label className='error'>{passwordErr}</label>
        <div className='buttonContainer'>
          <input type="button" className='loginButton' value="Sign up" onClick={onSignup}></input>
        </div>
      </div>
      <div className='bottomLeft'>
        <input type="button" value="To home" onClick={()=>{navigate("../")}}></input>
      </div>
    </div>
  );
}

export default Signup;
