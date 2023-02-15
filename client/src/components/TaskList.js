import Table from 'react-bootstrap/Table';

export default function TaskList(props) {
  const data = props.data
  const handleTaskSelection = props.handleTaskSelection
  const selectedTask = props.selectedTask
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>task ID</th>
          <th>task Name</th>
          <th>priority</th>
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
  )
}