import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../slices/userSlice";
import '../styles/home.css';

function Home() {
  const loggedIn = useSelector((state)=>state.user.loggedIn)
  const email = useSelector((state)=>state.user.email)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toLogin = (e)=>{
    if(!loggedIn)navigate("/login");
    else {
      dispatch(setLogin({loggedIn:false}));
      sessionStorage.setItem("user", null);
    }
  };
  return (
    <div className='Home'>      
      <div className="App-header">
        Home
      </div>
      <div className='App-body'>
        <div className='homeButtonContainer'>
            <input type="button" className='homeLoginButton' onClick={toLogin} value={loggedIn?"Log out":"Log in"}></input>
        </div>
        <div>{loggedIn? "Logged in as "+email : " "}</div>
      </div>
    </div>
  );
}

export default Home;
