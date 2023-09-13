import React, { useEffect, useState } from "react"
import "../Css/Todos.css";

export default function TodosSingle(props) {
    const [title, setTitle] = useState(props.title)
    const [completed, setCompleted] = useState(props.completed)
    const [id, setId] = useState(props.id)
    console.log(title + ' -> ' + completed)
    const handleClick = () => {
        setCompleted(!!!completed)
    }

    const handleClickDelete=()=>{}
    const handleClickUpdateTodo=(e)=>{}

    return (
        <>
            <div className={completed?  "divTodosSingleT": "divTodosSingleF"}>
                <input type="checkBox" id="doneTodos" checked={completed} onClick={handleClick}/>
                <label for="doneTodos">{title}</label>
            </div>
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

            </div> 
            }  
        </>
    )
}