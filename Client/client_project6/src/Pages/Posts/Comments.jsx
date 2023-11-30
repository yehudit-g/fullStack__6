import React, { useEffect, useState } from "react"
import CommentsSingle from "./CommentsSingle"
import { BsArrowLeftCircle } from 'react-icons/bs';
import { useParams, Link } from "react-router-dom"

export default function Comments() {

    const [listComments, setListComments] = useState([])
    const {idPost} = useParams()
    const [isFormVisible, setFormVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [url, setUrl] = useState('../posts')

    const getComments = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(`http://localhost:3000/posts/${idPost}/comments`);
        if (response.ok) {
            const jsonResponse = await response.json();
            setListComments(jsonResponse);
          }
          else throw new Error('Request failed');
      } catch (error) {
        console.log(error);
      }finally {
        setIsLoading(false);
      }
    }

    // useEffect(() => {
    //   console.log(listComments);
    // }, [listComments]);

    useEffect(() => {
        getComments()
    }, [])

    const setComment = async (newComment) => {
      try {
        const response = await fetch('http://localhost:3000/comments', {
          method: "POST",
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
    }
  
    const handleClickAddComment= async (event)=>{
      event.preventDefault();
      var {ftitle, fbody, fEmail} = document.forms[0];

      const newComment = {
      'postId': idPost,
      'name': ftitle.value,
      'email': fEmail.value,
      'body': fbody.value
      }

      let ComentData = await setComment(newComment);
      toggleForm()
      await getComments()
    }

    const toggleForm = () => {
      setFormVisible(!isFormVisible);
    };

    if (isLoading) {
      return <div>Loading...</div>;
    }
    
    return (
        <>
          <div>
            <button onClick={toggleForm}>+ Add Comment </button>
            {isFormVisible && (
              <form onSubmit={(e) => { handleClickAddComment(e); close();}} className="formAddComment">
                  <label>Title: </label>
                  <input type="text" name="ftitle" />
                  <br></br>
                  <label>Body: </label>
                  <input type="text" name="fbody" />
                  <br></br>
                  <label>Email: </label>
                  <input type="text" name="fEmail" />
                <button type="submit">Submit</button>
              </form>
            )}
          </div>

        <Link className="commentlink" to={url}><BsArrowLeftCircle /></Link>
         {listComments &&
            listComments.map(comment => {
              if(comment.state==1)
                return <CommentsSingle name={comment.name} body={comment.body} email={comment.email} 
                id={comment.id} postId={comment.postId} update={getComments}/>
            })
         }
        </>
    )
}