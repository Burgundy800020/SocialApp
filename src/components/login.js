import '../styles/login.css';
import {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import {fetchLogin, setEmail, setLogin} from "../slices/userSlice"

function Login(props) {
  const [emailInput, setEmailInput] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const loggedIn = useSelector((state)=>state.user.loggedIn)
  const email = useSelector((state)=>state.user.email)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const toSignup = ()=>{
    navigate("../signup");
  };

  const getLogin = async ()=>{
    //console.log(JSON.stringify({email:emailInput, password}))
    const r = await dispatch(fetchLogin({email:emailInput, password})).unwrap()
    setEmailErr("");
    setPasswordErr("");
    if(r.message === 'success'){
        dispatch(setLogin({loggedIn:true}))
        dispatch(setEmail({email:r.email}))
        sessionStorage.setItem("user", JSON.stringify({email:r.email, token:r.token}));
        navigate("../");
    }else{
      setPasswordErr(r.message);
    }
  }
  
  const onLogin = ()=>{
    setEmailErr("")
    setPasswordErr("")
    if(loggedIn){
      setEmailErr("Please log out first")
      return
    }
    if(emailInput === ''){
      setEmailErr('Enter an email')
      return
    }
    if(!(/^[A-z]/.test(emailInput) && /\w{2,4}$/.test(emailInput) && /@/.test(emailInput))){
      setEmailErr('Enter a valid email')
      return
    }
    getLogin()
  }  

  return (
    <div className='Login'>
      <header className="App-header">
        Login Page
      </header>
      <div className='loginBox'>
          <div className="inputContainer">
            Username:  
            <input type="text" className="loginInput" onChange={(ev)=>{setEmailInput(ev.target.value)}}></input>
          </div>
          <label className='error'>{emailErr}</label>
          <div className="inputContainer">
            Password:  
            <input type="text" className="loginInput" onChange={(ev)=>{setPassword(ev.target.value)}}></input>
          </div>
          <label className='error'>{passwordErr}</label>
        <div className='buttonContainer'>
          <input type="button" className='loginButton' value="Login" onClick={onLogin}></input>
          <input type="button" className='loginButton' onClick={toSignup} value="New Account"></input>
        </div>
      </div>
      <div className='bottomLeft'>
        <input type="button" value="To home" onClick={()=>{navigate("../")}}></input>
      </div>
    </div>
  )
}

export default Login
