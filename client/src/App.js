import React, { useState, useEffect } from 'react';
function App() {
  const [tasks, setTasks] = useState(false);
  useEffect(() => {
    getTask();
  }, []);
  function getTask() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setTasks(data);
      });
  }
  function createTask() {
    let name = prompt('Enter task name');
    let email = prompt('Enter task email');
    fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getTask();
      });
  }
  function deleteTask() {
    let id = prompt('Enter task id');
    fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getTask();
      });
  }
  return (
    <div>
      {tasks ? tasks : 'There is no task data available'}
      <br />
      <button onClick={createTask}>Add task</button>
      <br />
      <button onClick={deleteTask}>Delete task</button>
    </div>
  );
}
export default App;


