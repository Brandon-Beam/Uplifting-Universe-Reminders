import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Table from 'react-bootstrap/Table';

function App() {
  const [data, setData] = useState([]);
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
        return response.json();
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
        return response.json();
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


  return (
    <div>
      <h2>You Matter</h2>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>task ID</th>
            <th>task Name</th>
            <th>proirity</th>
            <th>time and date</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((task) => {
              console.log(task.priority)
              return (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.task_name}</td>
                  {task.priority === true ?
                    <td>high priority</td> :
                    <td>low priority</td>}
                  <td>{task.date_time}</td>
                </tr>
              )
            })}
        </tbody>
      </Table>
      {console.log(data)}
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


