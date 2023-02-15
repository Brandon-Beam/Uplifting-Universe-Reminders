const Pool = require('pg').Pool
const pool = new Pool({
  user: 'labber',
  host: 'localhost',
  database: 'positivitysql',
  password: 123,
  port: 5432,
});


const getTasks = () => {
  return pool
    .query(`
    select * from tasks ORDER BY priority DESC, date_time, task_name;`)
    .then((result) => {
      return result.rows
    })
    .catch((err) => {
      console.log("Catch: ", err.message);
    });
}


const updateTask = (body, id) => {
  const { task_name, done } = body
  return pool
    .query('UPDATE tasks SET task_name = $1, completed = $2 WHERE id = $3;', [task_name, done, id])
    .then((result) => {
      return result.rows
    })
    .catch((err) => {
      console.log("Catch: ", err.message);
    });
}

const createTask = (body) => {
  const { task_name, date_time } = body
  return pool
    .query('INSERT INTO tasks (user_id, task_name, priority, date_time) VALUES ($1, $2, $3, $4) RETURNING *', [1, task_name, false, '2023-02-08 14:00:00'])
    .then((result) => {
      return result.rows
    })
    .catch((err) => {
      console.log("Catch: ", err.message);
    });
}

const deleteTask = (id) => {
  return pool
    .query('DELETE FROM tasks WHERE id = $1', [id])
    .then((result) => {
      return result.rows
    })
    .catch((err) => {
      console.log("Catch: ", err.message);
    });
}

module.exports = {
  getTasks,
  createTask,
  deleteTask,
  updateTask
}