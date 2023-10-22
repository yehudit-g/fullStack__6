import React, {useState } from "react"
import "../../Css/Posts.css";
import { BsFillPencilFill } from 'react-icons/bs';


export default function CommentsSingle(props) {
    const [name, setName] = useState(props.name)
    const [email, setEmail] = useState(props.email)
    const [body, setBody] = useState(props.body)
    const [isFormVisible, setFormVisible] = useState(false);
    const [id, setId] = useState(props.id)
    const [postId, setPostId] = useState(props.postId)


    const toggleForm = () => {
        setFormVisible(!isFormVisible);
      };
  

      //--update--
      const handleClickUpdate = async (event)=>{
        event.preventDefault();
        var {fbody} = document.forms[0];
  
        const fnewBody = fbody.value? fbody.value: body
  
        const newComment = {
          'id': id,
          'postId': postId,
          'name': name,
          'email': email,
          'body': fnewBody,
        }
  
        try {
          const response = await fetch(`http://localhost:3000/posts/${postId}/comments/${id}`, {
            method: "PUT",
            mode: "cors",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newComment),
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
            <div className="divPostComent">
                <h3>{name}</h3> 
                <p>{body}</p>
                <p>{email}</p>
                <button onClick={toggleForm}> <BsFillPencilFill /> </button>
            </div>

            <div>                
              {isFormVisible && (
                <form onSubmit={(e) => { handleClickUpdate(e);}} className="formUpdatePost">
                  <label>Body: </label>
                  <input type="text" name="fbody" placeholder={body}/>
                  <button type="submit">Submit</button>
                </form>
              )}
            </div>
        </>
    )
}