import React from 'react'
import './ToDosItems.css'


const TodoItem = props =>{
    return(
        <div className = {`to-do-item ${ props.completed === true ? 'done' : 'active'}`}>
            <input 
                type="checkbox" 
                defaultChecked = {props.completed} 
                onChange = {props.handleChange}
            />
            <p>
                {props.description}
            </p>
            <button onClick = { props.remove } className = "delete">
                Delete Task
            </button>
        </div>
    )
}
export default TodoItem;