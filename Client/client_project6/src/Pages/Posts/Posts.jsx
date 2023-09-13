import React, { useEffect, useState } from "react"
import PostSingle from "./PostSingle"

export default function Post() {

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) ?? undefined)
    const [listPost, setListPosts] = useState([])

    const getPosts = async () => {
        try {
            const response = await fetch('http://localhost:3001/posts?userId=' + currentUser.id);
            if (response.ok) {
              const jsonResponse = await response.json();
              setListPosts(jsonResponse);
            }
            else throw new Error('Request failed');
          } catch (error) {
            console.log(error);
          }
    }

    useEffect(() => {
        getPosts()
    }, [currentUser])

    
    return (
        <>
         {listPost &&
            listPost.map(post => {
                return <PostSingle title={post.title} body={post.body} id={post.id}/>
            })
         }
        </>
    )
}