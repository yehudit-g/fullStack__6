import React, {useState } from "react"
import "../../../Css/Posts.css";

export default function CommentsSingle(props) {
    const [name, setName] = useState(props.name)
    const [email, setEmail] = useState(props.email)
    const [body, setBody] = useState(props.body)
    

    return (
        <>
            <div className="divPostComent">
                <h3>{name}</h3> 
                <p>{body}</p>
                <p>{email}</p>
            </div>
        </>
    )
}