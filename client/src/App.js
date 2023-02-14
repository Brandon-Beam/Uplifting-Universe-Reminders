import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    getTasks();
  }, []);
  function getTasks() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setTasks(data);
      });
  }

  function createTask() {
    let task_name = prompt('Enter task name');
    fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task_name }),
    })
      .then(response => {
        return response.text();
      })
      .then(() => {
        getTasks();
      });
  }

  function deleteTask() {
    let id = prompt('Enter task id');
    fetch(`/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(() => {
        getTasks();
      });
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

  // const task = tasks.map((task) => {
  //   const task_name = task.task_name

  //   return (
  //     <li>{task_name}</li>
  //   )
  // }
  // )

  return (
    <div>
      {tasks ? tasks : 'There is no task data available'}
      <br />
      <button onClick={createTask}>Add task</button>
      <br />
      <button onClick={updateTask}>edit task</button>
      <br />
      <button onClick={deleteTask}>Delete task</button>
    </div>
  );
}
export default App;


