import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import TimeSelect from './TimeSelect';


export default function AddTask(props) {
  const handleChange = props.handleChange
  const handleSubmit = props.handleSubmit
  const formData = props.formData
  const isChecked = props.isChecked
  const setIsChecked = props.setIsChecked
  const value = props.value
  const onChange = props.onChange

  return (
    <div className='add'>
      < Form onSubmit={handleSubmit} >
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <div>
            <TimeSelect value={value} onChange={onChange} />
          </div>

          <div>
            <Form.Label>task name</Form.Label>
            <Form.Control value={formData.name} onChange={handleChange} name="name" type="name" placeholder="task name" />
          </div>
          <div className="checkbox-wrapper">
            <label>
              <input type="checkbox" checked={isChecked}
                onChange={() => setIsChecked((prev) => !prev)} />
              <br />
              <Form.Label>Priority</Form.Label>
            </label>
          </div>
          <div >
            <Button type="submit">Add Task</Button>
          </div>
        </Form.Group>


      </Form >
    </div >
  )
}