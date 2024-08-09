import {memo} from "react";
import "../../styles/posts.css";
import Latex from 'react-latex-next';
import katex from "katex";
import 'katex/dist/katex.min.css';

function Post(props){
    
    return(
        <article className='post inheritWidth'>
            <div className='author'>{props.author}</div>
            <div className='date'>{props.date}</div>
            <div className='content'><Latex>{props.content}</Latex></div>
        </article>
    )
}

export default memo(Post)