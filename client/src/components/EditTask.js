import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default function EditTask(props) {
  const handleChange = props.handleChange
  const handleSubmit = props.handleSubmit
  const formData = props.formData
  const setMode = props.setMode
  const ADD = props.ADD
  const deleteSelected = props.deleteSelected
  const data = props.data
  const complete = props.complete
  return (<div>
    <Form onSubmit={handleSubmit} >
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>edit task</Form.Label>
        <Form.Control value={formData.name} onChange={handleChange} name="name" type="name" placeholder="task name" />
      </Form.Group>
      <Button type="submit">Edit Task</Button>
    </Form >
    <button className="btn btn-dark" onClick={() => setMode(ADD)}>Add Mode</button>
    <button className="btn btn-danger" onClick={deleteSelected}>Delete Task</button>
    <button className="btn btn-success" onClick={() => complete(data)}>Complete Task</button>
  </div>
  )
}