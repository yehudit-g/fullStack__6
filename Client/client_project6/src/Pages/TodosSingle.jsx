import React, { useEffect, useState } from "react"
import "../Css/Todos.css";
import { BsFillPencilFill } from 'react-icons/bs';

export default function TodosSingle(props) {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) ?? undefined)

    const [title, setTitle] = useState(props.title)
    const [completed, setCompleted] = useState(props.completed)
    const [id, setId] = useState(props.id)
    const [isFormVisible, setFormVisible] = useState(false);

    const handleClick = () => {
        setCompleted(!completed)
    }
   
    //--update--
    const handleClickUpdate = async (event)=>{
      event.preventDefault();
      var {ftitle, fcheckbox} = document.forms[0];

      const fnewTitle = ftitle.value? ftitle.value: title
      const newCompleted = fcheckbox.checked ? true : false;
      //const newCompleted = fcheckbox.value? fcheckbox.value: completed

      const newTodo = {
        'id': id,
        'userId': currentUser.id,
        'title': fnewTitle,
        'completed': newCompleted,
      }

      console.log('id'+ id+
      'userId'+ currentUser.id+
      'title'+ fnewTitle+
      'completed'+ newCompleted)

      try {
        const response = await fetch(`http://localhost:3000/todos/${currentUser.id}/${id}`, {
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

    const handleCheckboxChange=(e)=>{
      setCompleted(!completed);
    };


    return (
      <>
          <div className={completed?  "divTodosSingleT": "divTodosSingleF"}>
            {!isFormVisible && (
              <>
                <input type="checkBox" id="doneTodos" checked={completed} onClick={handleClick}/>
                <label for="doneTodos">{title}</label>
                <button onClick={toggleForm}> <BsFillPencilFill />  </button>
              </>
            )}

            <div>                
              {isFormVisible && (
                <form onSubmit={(e) => { handleClickUpdate(e);}} className="formUpdateTodo">
                  <input type="checkbox" name="fcheckbox" placeholder={completed} checked={completed}
                      onChange={(e) => handleCheckboxChange(e)} />
                  {/* <label>Title: </label> */}
                  <input type="text" name="ftitle" placeholder={title}/>
                  <button type="submit">Submit</button>
                </form>
              )}
              </div>
          </div>
        </>
      )
}