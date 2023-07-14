import React from "react";
import AddTaskForm from './AddTask.js';
import Task from './task.js';
import EditTask from './editTask.js'

export default class TaskList extends React.Component {

    state = {
        tasks: [
            {
            id: 1,
            description: "Walk the dog",
            done: false
            },
            {
            id: 2,
            description: "Water the plants",
            done: false
            },
            {
            id: 3,
            description: "Pay the bills",
            done: false
            }
        ],
        newTaskName: "",
        modifiedTaskName: "",
        taskBeingEdited: 0
  };

  updateFormField = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };


  addTask = (e) => {
    let newTask = {
      id: Math.floor(Math.random() * 10000 + 9999),
      description: this.state.newTaskName,
      done: false
    };

    let currentValues = this.state.tasks;
    let modifiedValues = [...currentValues, newTask];

    this.setState({
      tasks: modifiedValues,
      newTaskName: ""
    });
  };

  checkTask = (task_id) => {
    let currentTask = this.state.tasks.filter((t) => t.id === task_id)[0];
    let modifiedTask = { ...currentTask };
    modifiedTask.done = !currentTask.done;
    let modifiedTasksList = this.state.tasks.map((t) => {
      if (t.id !== task_id) {
        return t;
      } else {
        return modifiedTask;
      }
    });
    this.setState({
      tasks: modifiedTasksList
    });
  };

  deleteTask = (task_id) => {
    let task_index = this.state.tasks.findIndex((t) => t.id === task_id);
    let modifiedTasks = [
      ...this.state.tasks.slice(0, task_index),
      ...this.state.tasks.slice(task_index + 1)
    ];
    this.setState({
      tasks: modifiedTasks
    });
  };

  updateTask = (task_id) => {
    let currentTask = this.state.tasks.filter((t) => t.id === task_id)[0];
    let modifiedTask = { ...currentTask };
    modifiedTask.description = this.state.modifiedTaskName;
    let modifiedTasksList = this.state.tasks.map((t) => {
      if (t.id !== task_id) {
        return t;
      } else {
        return modifiedTask;
      }
    });
    this.setState({
      tasks: modifiedTasksList
    });
  };

  setTaskToEdit = (task) => {
    this.setState({
        taskBeingEdited: task.id,
        modifiedTaskName: task.description
    })
  }

  finishUpdateTask = (task) =>{
    this.updateTask(task.id);
    this.setState({
        taskBeingEdited:0
    })
  }

  render() {
    return (
      <React.Fragment>
        <h1>Todo List</h1>
        <ul>
          {this.state.tasks.map((t) =>
            this.state.taskBeingEdited !== t.id
              ? <Task 
                    task={t}
                    setTaskToEdit={this.setTaskToEdit}
                    deleteTask={this.deleteTask}
                    checkTask={this.checkTask}
                />
              : <EditTask
                    task={t}
                    modifiedTaskName={this.state.modifiedTaskName}
                    updateFormField={this.updateFormField}
                    finishUpdateTask={this.finishUpdateTask}
              />
          )}
        </ul>

        <AddTaskForm 
            newTaskName={this.state.newTaskName}
            updateFormField={this.updateFormField}
            addTask={this.addTask}
        />
      </React.Fragment>
    );
  }
}
