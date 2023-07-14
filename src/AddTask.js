import React from "react";

export default function AddTaskForm(props) {
  return (
    <React.Fragment>
      <h2>Create new Task</h2>
      <div>
        <label>Task Description</label>
        <input
          type="text"
          name="newTaskName"
          value={props.newTaskName}
          onChange={props.updateFormField}
        />
        <button onClick={props.addTask}>Add</button>
      </div>
    </React.Fragment>
  );
}
