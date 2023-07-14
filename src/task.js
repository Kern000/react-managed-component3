import React from 'react';

export default function Task(props){
    return (
        <li key={props.task.id}>
          {props.task.description}
          <input
            type="checkbox"
            value={props.task.done === true}
            onChange={()=>props.checkTask(props.task.id)}
          />
          <button onClick={() => {
              props.setTaskToEdit(props.task);
            }}
          > Edit
          </button>
  
          <button
            onClick={() => {
              props.deleteTask(props.task.id);
            }}
          > Delete
          </button>
        </li>
      );
}

//debug - remember, functions being called with () need ()=>{} to prevent it from being called straight away. functions not being called with argument being passed through will just use props.propsNameOfFunction
