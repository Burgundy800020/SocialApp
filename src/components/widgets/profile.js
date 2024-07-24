import { memo} from "react";
import "../../styles/posts.css"


function Profile(props){     
    let butStyle = {
      backgroundColor: (!props.followed)? "blue" : "white",
      color: (!props.followed)? "white" : "black"
    }
  
    return (<article className='profile inheritWidth'>
    <div className='profileName'>{props.email}</div>
    <button style = {butStyle} onClick={props.onFollow}>
      {props.followed?"following" : (props.requested?"requested":"follow")}
    </button>
  </article>)
  }

  export default memo(Profile)