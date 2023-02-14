import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function App() {
  const [data, setData] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);
  useEffect(() => {
    getTasks();
  }, []);
  const [formData, setFormData] = useState('');

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
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>task name</Form.Label>
          <Form.Control value={formData.name} onChange={handleChange} name="name" type="name" placeholder="task name" />
        </Form.Group>
        <Button type="submit">Add Task</Button>
      </Form>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>task ID</th>
            <th>task Name</th>
            <th>proirity</th>
            <th>time and date</th>
            <th>select</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((task) => {
              return (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.task_name}</td>
                  {task.priority === true ?
                    <td>high priority</td> :
                    <td>low priority</td>}
                  <td>{task.date_time}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedTask.includes(task.id)}
                      onChange={() => handleTaskSelection(task.id)}
                    />
                  </td>
                </tr>
              )
            })}
        </tbody>
      </Table>


      <button class="btn btn-dark" onClick={updateTask}>edit task</button>
      <br />
      <button class="btn btn-danger" onClick={deleteSelected}>Delete task</button>
    </div>
  );
}
export default App;


