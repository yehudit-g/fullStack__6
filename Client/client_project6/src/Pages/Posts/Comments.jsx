import React, { useEffect, useState } from "react"
import CommentsSingle from "./CommentsSingle"
import { BsArrowLeftCircle } from 'react-icons/bs';
import { useParams, Link } from "react-router-dom"

export default function Comments() {

    const [listComments, setListComments] = useState([])
    const {idPost} = useParams()
    
    const [url, setUrl] = useState('../posts')

    const getComments = async () => {
        try {
          const response = await fetch(`http://localhost:3000/posts/${idPost}/comments`);
          if (response.ok) {
              const jsonResponse = await response.json();
              setListComments(jsonResponse);
            }
            else throw new Error('Request failed');
          } catch (error) {
            console.log(error);
          }
    }

    useEffect(() => {
        getComments()
    }, [])

    
    return (
        <>
        <Link className="commentlink" to={url}><BsArrowLeftCircle /></Link>
         {listComments &&
            listComments.map(comment => {
                return <CommentsSingle name={comment.name} body={comment.body} email={comment.email} id={comment.id}/>
            })
         }
        </>
    )
}