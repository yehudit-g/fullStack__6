import React, {useEffect,useState } from "react"
import { BsBoxArrowUpLeft, BsChatDots, BsFillPencilFill, BsTrash3 } from 'react-icons/bs';

import "../../Css/Posts.css";
import {Link, Navigate} from "react-router-dom"

export default function PostSingle(props) {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) ?? undefined)

    const [title, setTitle] = useState(props.title)
    const [body, setBody] = useState(props.body)
    const [id, setId] = useState(props.id)
    const [url, setUrl] = useState(id + '/comments')
    const [isFormVisible, setFormVisible] = useState(false);


    useEffect(() => {
      console.log('PostSingle re-rendered with updated data');
    }, [title, body]);


    const toggleForm = () => {
        setFormVisible(!isFormVisible);
      };
  
//--delete--
      const handleClickDelete = async () => {
        try {
          console.log(id)
          const response =  await fetch(`http://localhost:3000/posts/${id}`, {
              method: "DELETE",
              mode: "cors"
          })
          if (response.ok) {
            const jsonResponse = await response.json();
          }
          else throw new Error('Request failed of delete post');
        } catch (error) {
            console.log("Error:", error);
        }
        await props.update();
      } 

      const updatePost=async(newPost)=>{
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
          else throw new Error('Request failed');
        } catch (error) {
          console.log(error);
        }
      }

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

        try {
          // Update the post and wait for it to complete
          const updatedPost = await updatePost(newPost);
  
          // Check if the update was successful
          if (updatedPost) {
            // If successful, toggle the form and then update props
            toggleForm();
            await props.update();
          } else {
            console.error('Update failed'); // Log an error if the updateTodo didn't return expected data
          }
        } catch (error) {
          console.error('Error updating post:', error);
        }
      }


    return (
        <>
        <div className="divPost">
          <div className="divPostAlone">
            {!isFormVisible && (
              <>
                <h3>{title}</h3> 
                <p>{body}</p>
              </>
            )}

            <div className="divPostIcons">
            <button id="updateIcon" className="divPostIconsS" onClick={handleClickDelete}><BsTrash3/></button>
              <button id="updateIcon" className="divPostIconsS" onClick={toggleForm}><BsFillPencilFill/></button>
              <Link className="divPostIconsS" to={url}><BsChatDots /></Link>
            </div>
            
            <div>     
              {isFormVisible && (
                <form onSubmit={(e) => { handleClickUpdate(e); }} className="formUpdatePost">
                  <label>Title: </label>
                  <input type="text" name="ftitle" placeholder={title}/>
                  <br></br>
                  <label>Body: </label>
                  <input type="text" name="fbody" placeholder={body}/>
                  <br></br>
                  <button type="submit">Submit</button>
                </form>
              )}
            </div>
          </div>
        </div>
        </>
    )
}