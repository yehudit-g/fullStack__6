import React, { useEffect, useState } from "react"
import "../Css/Todos.css";

export default function TodosSingle(props) {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) ?? undefined)

    const [title, setTitle] = useState(props.title)
    const [completed, setCompleted] = useState(props.completed)
    const [id, setId] = useState(props.id)
    console.log(title + ' -> ' + completed)
    const handleClick = () => {
        setCompleted(!!!completed)
    }

   
      const handleClickUpdate= async (event)=>{
        event.preventDefault();
        var {ftitle, fcheckbox} = document.forms[0];

        const fnewTitle = ftitle.value? ftitle.value: title
        const newCompleted = fcheckbox.value? fcheckbox.value: completed

      const newTodo = {
        'id': id,
        'userId': currentUser.id,
        'title': fnewTitle,
        'completed': newCompleted,
      }
  
      try {
        const response = await fetch(`http://localhost:3000/todos${id}`, {
          method: "PUT",
          mode: "cors",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newTodo),
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
  
      const toggleForm = () => {
        setFormVisible(!isFormVisible);
      };

 
      return (
        <>
            <div className={completed?  "divTodosSingleT": "divTodosSingleF"}>
                <input type="checkBox" id="doneTodos" checked={completed} onClick={handleClick}/>
                <label for="doneTodos">{title}</label>

                <div>
                <button onClick={toggleForm}> Update Todo </button>
                {isFormVisible && (
                <form onSubmit={(e) => { handleClickUpdate(e);}} className="formUpdateTodo">
                  <input type="checkbox" name="fcheckbox" placeholder={completed}/>
                  <label>Title: </label>
                  <input type="text" name="ftitle" placeholder={title}/>
                <button type="submit">Submit</button>
                </form>
                 )}
                </div>
            </div>

            {/* {<div className="buttonItem">
                <Popup trigger={<button className="iconbutt" ><BsFillPencilFill /></button>} 
                model nested>
                {
                    close => (
                        <div className=" divPopup">
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        X
                                </button>
                            </div>

                            <div className=" formPopup">
                                <form onSubmit={(e) => { handleClickUpdateTodo(e); close();}}>
                                    <div className="input-container">
                                        <h2>Update {id} Todo</h2>
                                    </div>
                                    <div className="input-container">
                                        <label>Title: </label>
                                        <input type="text" name="ftitle" placeholder={title} />
                                    </div>
                                    <div className="input-container">
                                        <label>completed: </label>
                                        <input type="checkbox" name="fcomplete" placeholder={completed} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    )
                }
                </Popup>
                <button className="iconbutt" onClick={handleClickDelete}><AiFillDelete /></button> 

            </div>  }*/
            }  
        </>
    )
}