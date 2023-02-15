import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';

function App() {
  const ADD = "ADD";
  const EDIT = "EDIT";

  const [data, setData] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);
  const [formData, setFormData] = useState({ name: '' });
  const [mode, setMode] = useState(ADD);

  useEffect(() => {
    getTasks();
  }, []);

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
        setSelectedTask([])
      });
  }

  function deleteSelected() {
    for (const task of selectedTask)
      deleteTask(task)
  }

  function updateTask(task_name, selectedTask, complete) {
    let id = selectedTask
    let done = complete || false
    fetch(`/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task_name, done }),
    })
      .then(() =>
        getTasks(),
        setSelectedTask([])
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
    if (mode === ADD) {
      createTask(formData.name)
      setFormData({ name: '' })
    } if (mode === EDIT && selectedTask.length === 1) {
      updateTask(formData.name, selectedTask)
      setFormData({ name: '' })
    }
    if (mode === EDIT && selectedTask.length !== 1) {
      alert('invalid inputs')
      console.log(selectedTask)
    }
  }

  const complete = (data) => {
    for (const task of selectedTask) {
      let item = data.filter(item => item.id === task)
      console.log(item[0].task_name);
      updateTask(item[0].task_name, task, true);
      console.log(data)
    }
  }

  return (
    <div class='myclass'>
      <h2>You Matter</h2>
      {mode === ADD && (
        <AddTask handleChange={handleChange} handleSubmit={handleSubmit} formData={formData} setMode={setMode} EDIT={EDIT} deleteSelected={deleteSelected} />)}
      {mode === EDIT && (
        <EditTask handleChange={handleChange} handleSubmit={handleSubmit} formData={formData} setMode={setMode} ADD={ADD} deleteSelected={deleteSelected} />)}
      <button class="btn btn-success" onClick={() => complete(data)}>Completion</button>
      <TaskList data={data} handleTaskSelection={handleTaskSelection} selectedTask={selectedTask} />
    </div>
  );
}
export default App;


