import React, {useState } from "react"
import { BsBoxArrowUpLeft, BsChatDots, BsFillPencilFill } from 'react-icons/bs';

import "../../Css/Posts.css";
import {Link, Navigate} from "react-router-dom"

export default function PostSingle(props) {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) ?? undefined)

    const [title, setTitle] = useState(props.title)
    const [body, setBody] = useState(props.body)
    const [id, setId] = useState(props.id)
    const [url, setUrl] = useState(id + '/comments')
    const [isFormVisible, setFormVisible] = useState(false);

    const toggleForm = () => {
        setFormVisible(!isFormVisible);
      };
  
  
      //--update--
      const handleClickUpdate = async (event)=>{
        event.preventDefault();
        var {ftitle, fbody} = document.forms[0];
  
        const fnewTitle = ftitle.value? ftitle.value: title
        const fnewBody = fbody.value? fbody.value: body
  
        const newPost = {
          'id': id,
          'userId': currentUser.id,
          'title': fnewTitle,
          'body': fnewBody,
        }
  
        console.log('id'+ id+
        'userId'+ currentUser.id+
        'title'+ fnewTitle+
        'body'+ fnewBody)
  
        try {
          const response = await fetch(`http://localhost:3000/posts/${id}`, {
            method: "PUT",
            mode: "cors",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost),
          });
          if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
          }
          throw new Error('Request failed');
        } catch (error) {
          console.log(error);
        }
        
        toggleForm()
        //await getTodos()   רענון עמוד
      }


    return (
        <>
        <div className="divPost">
            <div className="divPostAlone">
                <h3>{title}</h3> 
                <p>{body}</p>
                <button onClick={toggleForm}><BsFillPencilFill /></button>

                <div className="divPostIcons">
                        {/* <Link className="divPostIconsS"><BsBoxArrowUpLeft /></Link> */}
                    <Link className="divPostIconsS" to={url}><BsChatDots /></Link>
                </div>
            </div>

            <div>                
              {isFormVisible && (
                <form onSubmit={(e) => { handleClickUpdate(e);}} className="formUpdatePost">
                  <label>Title: </label>
                  <input type="text" name="ftitle" placeholder={title}/>
                  <label>Body: </label>
                  <input type="text" name="fbody" placeholder={body}/>
                  <button type="submit">Submit</button>
                </form>
              )}
            </div>
        </div>
        </>
    )
}