import { memo} from "react";
import "../../styles/posts.css"

function FollowRequest(props){     
    let confirmButStyle = {
      backgroundColor: "blue",
      color: "white"
    }
    let deleteButStyle = {
        backgroundColor: "white",
        color: "black"
      }
  
    return (<article className='profile inheritWidth'>
    <div className='profileName'>{props.email}</div>
    <button style = {confirmButStyle} onClick={()=>props.onConfirm("confirm")}>
      Confirm
    </button>
    <button style = {deleteButStyle} onClick={()=>props.onConfirm("delete")}>
      Delete
    </button>
  </article>)
  }

  export default memo(FollowRequest)