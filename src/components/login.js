import '../styles/login.css';
import {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const navigate = useNavigate();
  
  const toSignup = ()=>{
    navigate("../signup");
  };

  const getLogin = ()=>{
    fetch('http://localhost:3080/api/auth', {
      method: 'POST',
      headers : {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({email, password})
    })
    .then((r)=>r.json())
    .then((r)=>{
      setEmailErr("");
      setPasswordErr("");
      if(r.message === 'success'){
          sessionStorage.setItem("user", JSON.stringify({email, token:r.token}));
          props.setLoggedIn(true);
          props.setEmail(email);
          navigate("../");
        }else{
          setPasswordErr(r.message);
        }
    });
  }
  
  const onLogin = (ev)=>{
    setEmailErr("");
    setPasswordErr("");
    if(email === ''){
      setEmailErr('Enter an email');
      return;
    }
    if(!(/^[A-z]/.test(email) && /\w{2,4}$/.test(email) && /@/.test(email))){
      setEmailErr('Enter a valid email');
      return;
    }
    getLogin();
  }  

  return (
    <div className='Login'>
      <header className="App-header">
        Login Page
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
          <input type="button" className='loginButton' value="Login" onClick={onLogin}></input>
          <input type="button" className='loginButton' onClick={toSignup} value="New Account"></input>
        </div>
      </div>
      <div className='bottomLeft'>
        <input type="button" value="To home" onClick={()=>{navigate("../")}}></input>
      </div>
    </div>
  );
}

export default Login;
