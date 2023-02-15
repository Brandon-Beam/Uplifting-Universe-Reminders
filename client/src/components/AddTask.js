import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default function AddTask(props) {
  const handleChange = props.handleChange
  const handleSubmit = props.handleSubmit
  const formData = props.formData
  return (
    < Form onSubmit={handleSubmit} >
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>task name</Form.Label>
        <Form.Control value={formData.name} onChange={handleChange} name="name" type="name" placeholder="task name" />
      </Form.Group>
      <Button type="submit">Add Task</Button>
    </Form >
  )
}