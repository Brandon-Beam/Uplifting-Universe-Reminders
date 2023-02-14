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
    select * from tasks;`)
    .then((result) => {
      return result.rows
    })
    .catch((err) => {
      console.log("Catch: ", err.message);
    });
}


const updateTask = (body, id) => {
  const { task_name, description } = body
  return pool
    .query('UPDATE tasks SET task_name = $1, description = $2 WHERE id = $3;', [task_name, description, id])
    .then((result) => {
      return result.rows
    })
    .catch((err) => {
      console.log("Catch: ", err.message);
    });
}

const createTask = (body) => {
  const { task_name, description } = body
  return pool
    .query('INSERT INTO tasks (task_name, description) VALUES ($1, $2) RETURNING *', [task_name, description])
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