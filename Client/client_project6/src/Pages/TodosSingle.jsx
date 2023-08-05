import React, { useEffect, useState } from "react"
import "../../Css/Todos.css";

export default function TodosSingle(props) {
    const [title, setTitle] = useState(props.title)
    const [completed, setCompleted] = useState(props.completed)
    const [id, setId] = useState(props.id)
    console.log(title + ' -> ' + completed)
    const handleClick = () => {
        setCompleted(!!!completed)
    }

    return (
        <>
            <div className={completed?  "divTodosSingleT": "divTodosSingleF"}>
                <input type="checkBox" id="doneTodos" checked={completed} onClick={handleClick}/>
                <label for="doneTodos">{title}</label>
            </div>
        </>
    )
}