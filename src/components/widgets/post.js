import {useState, useEffect, memo} from "react";
import "../../styles/posts.css"

function Post(props){
    useEffect(()=>{
        console.log("rendering tasks")
    })
    return(
        <article className='post inheritWidth'>
            <div className='author'>{props.author}</div>
            <div className='date'>{props.date}</div>
            <div className='content'>{props.content}</div>
        </article>
    )
}

export default memo(Post)