import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

import TaskList from './components/TaskList';
import AddTask from './components/AddTask';

function App() {
  const [data, setData] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);
  useEffect(() => {
    getTasks();
  }, []);
  const [formData, setFormData] = useState({ name: '' });

  function getTasks() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.json();
      })
      .then(data => {
        setData(data);
      });
  }

  function createTask(task) {
    let task_name = task;
    fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task_name }),
    })
      .then(response => {
        return response.json();
      })
      .then(() => {
        getTasks();
      });
  }

  function deleteTask(id) {
    fetch(`/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.json();
      })
      .then(() => {
        getTasks();
      });
  }

  function deleteSelected() {
    for (const task of selectedTask)
      deleteTask(task)
  }

  function updateTask() {
    let id = prompt('Enter task id');
    let task_name = prompt('Enter task name');
    fetch(`/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task_name }),
    })
      .then(() =>
        getTasks()
      );
  }

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleTaskSelection = (id) => {
    if (selectedTask.includes(id)) {
      setSelectedTask(selectedTask.filter((i) => i !== id));
    } else {
      setSelectedTask([...selectedTask, id]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createTask(formData.name);
    setFormData({ name: '' })
  }

  return (
    <div>
      <h2>You Matter</h2>
      <AddTask handleChange={handleChange} handleSubmit={handleSubmit} formData={formData} />
      <button class="btn btn-dark" onClick={updateTask}>edit task</button>
      <button class="btn btn-danger" onClick={deleteSelected}>Delete task</button>
      <TaskList data={data} handleTaskSelection={handleTaskSelection} selectedTask={selectedTask} />


    </div>
  );
}
export default App;


