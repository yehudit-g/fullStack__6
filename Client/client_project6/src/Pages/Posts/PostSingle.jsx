import React, {useState } from "react"
import { BsBoxArrowUpLeft, BsChatDots } from 'react-icons/bs';
import "../../../Css/Posts.css";
import {Link, Navigate} from "react-router-dom"

export default function PostSingle(props) {
    const [title, setTitle] = useState(props.title)
    const [body, setBody] = useState(props.body)
    const [id, setId] = useState(props.id)
    const [url, setUrl] = useState(id + '/comments')


    return (
        <>
            <div className="divPost">
                <div className="divPostAlone">
                    <h3>{title}</h3> 
                    <p>{body}</p>
                    <div className="divPostIcons">
                        {/* <Link className="divPostIconsS"><BsBoxArrowUpLeft /></Link> */}
                        <Link className="divPostIconsS" to={url}><BsChatDots /></Link>
                    </div>
                </div>
            </div>
            
        </>
    )
}