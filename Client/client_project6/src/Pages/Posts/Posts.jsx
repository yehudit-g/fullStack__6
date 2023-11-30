import React, { useEffect, useState } from "react"
import PostSingle from "./PostSingle"

export default function Post() {

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) ?? undefined)
    const [isFormVisible, setFormVisible] = useState(false);
    const [listPost, setListPosts] = useState([])
    const [initialData, setInitialData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getPosts = async () => {
      try {
        setIsLoading(true);

        const response = await fetch('http://localhost:3000/posts?userId=' + currentUser.id);
        if (response.ok) {
          const jsonResponse = await response.json();
          setListPosts(jsonResponse);
          console.log("list post setted");
        }
        else throw new Error('Request failed');
      } catch (error) {
        console.log(error);
      }finally {
        setIsLoading(false);
      }
    }

    useEffect(() => {
        getPosts()
    }, [currentUser])

    // useEffect(() => {
    //   console.log(listPost); // This will reflect the updated state.
    // }, [listPost]);

    
    const setPost = async (newPost) => {
      try {
        const response = await fetch('http://localhost:3000/posts', {
          method: "POST",
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
    }
  
    //--add--
    const handleClickAddPost= async (event)=>{
      event.preventDefault();
      var {ftitle, fbody} = document.forms[0];

      const newPost = {
      'userId': currentUser.id,
      'title': ftitle.value,
      'body': fbody.value,
      }

      let PostData = await setPost(newPost);
      toggleForm();
      await getPosts();
    }

    const toggleForm = () => {
      setFormVisible(!isFormVisible);
    };


    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
        <>
          <div className="divAddPost">
            <button className="buttonAdd" onClick={toggleForm}>+ Add Post </button>
            {isFormVisible && (
              <form onSubmit={(e) => { handleClickAddPost(e); close();}} className="formAddPost">
                  <label>Title: </label>
                  <input type="text" name="ftitle" />
                  <br></br>
                  <label>Body: </label>
                  <input type="text" name="fbody" />
                <button type="submit">Submit</button>
              </form>
            )}
          </div>

         {listPost &&
            listPost.map(post => {
              if(post.state==1)
                return <PostSingle title={post.title} body={post.body} id={post.id} update={getPosts} // Pass the getPosts function as a callback
                />
            })
         }
        </>
    )
}