import Table from 'react-bootstrap/Table';

export default function TaskList(props) {
  const data = props.data
  const handleTaskSelection = props.handleTaskSelection
  const selectedTask = props.selectedTask
  return (

    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Task ID</th>
          <th>Task Name</th>
          <th>Priority</th>
          <th>Time and Date</th>
          <th>Complete</th>
          <th>Select</th>
        </tr>
      </thead>
      <tbody >
        {data &&
          data.map((task) => {
            return (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.task_name}</td>
                {task.priority === true ?
                  <td>high priority</td> :
                  <td>low priority</td>}
                <td>{new Date(task.date_time).toString()}</td>
                {task.completed === true ?
                  <td className='notatable_completed'>Well done!!</td> :
                  <td>You can do it!!</td>}
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

  )
}