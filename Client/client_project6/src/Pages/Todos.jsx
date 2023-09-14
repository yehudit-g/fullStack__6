import React, { useEffect, useState } from "react"
import TodosSingle from "./TodosSingle"

export default function Todos() {

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) ?? undefined)
    const [listTodos, setListTodos] = useState([])

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


    const handleClickAddTodo=(e)=>{}
    
    return (
        <>
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
                return <TodosSingle title={todo.title} completed={todo.completed} id={todo.id}/>
            })
          }

          {sortByField === 'title' && listTodos && 
            listTodos.sort((a, b) => a["title"] > b["title"] ? 1 : -1).map(todo => {
                return <TodosSingle title={todo.title} completed={todo.completed} id={todo.id}/>
            })
          }

          {sortByField === 'completed' && listTodos && 
            listTodos.sort((a, b) => a["completed"] > b["completed"] ? 1 : -1).map(todo => {
                return <TodosSingle title={todo.title} completed={todo.completed} id={todo.id}/>
            })
          }  

        {/* 
          {<div className="buttonItem">
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
                                <form onSubmit={(e) => { handleClickAddTodo(e); close();}}>
                                    <div className="input-container">
                                        <h2>New Todo</h2>
                                    </div>
                                    <div className="input-container">
                                        <label>Title: </label>
                                        <input type="text" name="ftitle" placeholder={title} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    )
                }
                </Popup>
                
            </div> 
            }   */
          }
        </>
    )
}