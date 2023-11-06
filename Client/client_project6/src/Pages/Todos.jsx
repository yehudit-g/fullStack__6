import React, { useEffect, useState } from "react"
import TodosSingle from "./TodosSingle"

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../Css/Todos.css';


export default function Todos() {

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) ?? undefined)
    const [listTodos, setListTodos] = useState([])
    const [isFormVisible, setFormVisible] = useState(false);

    const [sortByField, setSortByField] = useState("arranged (id)");

    const sortFunc = (a, b) => {
      debugger
      if (sortByField === 'arranged (id)') {
        //return listTodos.sort((a, b) => a["id"] > b["id"] ? 1 : -1) 
        return a["id"] > b["id"] ? 1 : -1 
      }
      else {
        return a[sortByField] > b[sortByField] ? 1 : -1
        //return listTodos.sort((a, b) => a[sortByField] > b[sortByField] ? 1 : -1) 
      }
    }

  //   useEffect(() => {
  //     sortFunc(sortByField)
  // }, [sortByField])

    const sortBy = (e) => {
      setSortByField(e);
    }

    const getTodos = async () => {
        try {
            const response = await fetch('http://localhost:3000/todos?userId=' + currentUser.id);
            if (response.ok) {
              const jsonResponse = await response.json();
              setListTodos(jsonResponse);
            }
            else throw new Error('Request failed');
          } catch (error) {
            console.log(error);
          }
        }

    useEffect(() => {
        getTodos()
    }, [currentUser])
    
    const setTodo = async (newTodo) => {
      try {
        const response = await fetch('http://localhost:3000/todos', {
          method: "POST",
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
    }
  
    const handleClickAddTodo= async (event)=>{
      event.preventDefault();
      var {ftitle, fcheckbox} = document.forms[0];
      // if(fcheckbox.value=="on")
      //   var completed=true;
      // else 
      //   completed=false;

      const newTodo = {
      'userId': currentUser.id,
      'title': ftitle.value,
      'completed': fcheckbox.value,
      }

    let TodoData = await setTodo(newTodo);
    toggleForm()
    await getTodos()
    }

    const toggleForm = () => {
      setFormVisible(!isFormVisible);
    };
    
    

    return (
        <>
          <div className="divAddTodo">
            {isFormVisible && (
            <>
              <form onSubmit={(e) => { handleClickAddTodo(e); close();}} className="formAddTodo">
                  <input type="checkbox" name="fcheckbox"/>
                  <label>Title: </label>
                  <input type="text" name="ftitle" />
                <button type="submit">Submit</button>
              </form>
              <br></br>
            </>)}
            <button className="buttonAdd" onClick={toggleForm}>+ Add Todo </button>
          </div>

          <span>Sort By</span> <br></br>
          <select defaultValue={'arranged (id)'} onChange={(e) => sortBy(e.target.value)}>
            <option value="arranged (id)" disabled>None</option>
            <option value="arranged (id)">Arranged</option>
            <option value="title">Title</option>
            <option value="completed">Completed</option>
          </select>
          <br></br>
          
          {console.log('==============================')}

          {sortByField === 'arranged (id)' && listTodos && 
            listTodos.sort((a, b) => a["id"] > b["id"] ? 1 : -1).map(todo => {
              if(todo.state==1)
                return <TodosSingle title={todo.title} completed={todo.completed} id={todo.id}/>
            })
          }

          {sortByField === 'title' && listTodos && 
            listTodos.sort((a, b) => a["title"] > b["title"] ? 1 : -1).map(todo => {
              if(todo.state==1)
                return <TodosSingle title={todo.title} completed={todo.completed} id={todo.id}/>
            })
          }

          {sortByField === 'completed' && listTodos && 
            listTodos.sort((a, b) => a["completed"] > b["completed"] ? 1 : -1).map(todo => {
              if(todo.state==1)
                return <TodosSingle title={todo.title} completed={todo.completed} id={todo.id}/>
            })
          }  
        </>
    )
}