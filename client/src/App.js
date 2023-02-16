import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';
import Header from './components/Header';


import './Sample.css';
import TimeSelect from './components/TimeSelect';

function App() {
  //view modes
  const ADD = "ADD";
  const EDIT = "EDIT";
  // state
  const [value, onChange] = useState(new Date());
  const [data, setData] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);
  const [formData, setFormData] = useState({ name: '' });
  const [mode, setMode] = useState(ADD);
  const [isChecked, setIsChecked] = useState(false);
  // calls getTasks, prevents repeat
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
  //dateTime needs to be converted to local 
  function createTask(task, dateTime, priority) {
    let task_name = task;
    let date_time = dateTime.toLocaleString()
    fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task_name, date_time, priority }),
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
  //dateTime needs to be converted to local 
  function updateTask(task_name, selectedTask, complete, dateTime, priority) {
    let id = selectedTask
    let done = complete || false
    let date_time = dateTime.toLocaleString()
    fetch(`/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task_name, done, date_time, priority }),
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
    if (mode === ADD && formData.name !== '') {
      createTask(formData.name, value, isChecked)
      setFormData({ name: '' })
    } if (mode === EDIT && selectedTask.length === 1) {
      updateTask(formData.name, selectedTask, false, value, isChecked)
      setFormData({ name: '' })
    }
    if (mode === EDIT && selectedTask.length !== 1) {
      alert('invalid inputs')
    }
  }

  const complete = (data) => {
    for (const task of selectedTask) {
      let item = data.filter(item => item.id === task)
      updateTask(item[0].task_name, task, true, item[0].date_time);
    }
  }

  return (
    <div className='myapp'>
      <Header data={data} />
      <div className='timepriority'>
        <TimeSelect value={value} onChange={onChange} />
        <div className="checkbox-wrapper">
          <label>
            <input type="checkbox" checked={isChecked}
              onChange={() => setIsChecked((prev) => !prev)} />
            <span>priority</span>
          </label>
        </div>
      </div>
      {
        mode === ADD && (
          <AddTask handleChange={handleChange} handleSubmit={handleSubmit}
            formData={formData} setMode={setMode} EDIT={EDIT} deleteSelected={deleteSelected}
            complete={complete} data={data}
            isChecked={isChecked} setIsChecked={setIsChecked} />)
      }
      {
        mode === EDIT && (
          <EditTask handleChange={handleChange} handleSubmit={handleSubmit}
            formData={formData} setMode={setMode} ADD={ADD} deleteSelected={deleteSelected}
            complete={complete} data={data} />)
      }
      <TaskList data={data} handleTaskSelection={handleTaskSelection} selectedTask={selectedTask}
      />
    </div >
  );
}
export default App;


