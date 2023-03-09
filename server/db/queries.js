const Pool = require('pg').Pool
const pool = new Pool({
  user: 'labber',
  host: 'localhost',
  database: 'positivitysql',
  password: 123,
  port: 5432,
});

// all db requests go through here
const getTasks = async () => {
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
  const { task_name, done, date_time, priority } = body
  console.log(body)
  return pool
    .query('UPDATE tasks SET task_name = $1, date_time = $2, completed = $3, priority = $4 WHERE id = $5;', [task_name, date_time, done, priority, id])
    .then((result) => {
      return result.rows
    })
    .catch((err) => {
      console.log("Catch: ", err.message);
    });
}
//handles completion through incoming text message
const textComplete = (id) => {
  return pool
    .query('UPDATE tasks SET completed = true WHERE id = $1;', [id])
    .then((result) => {
      return result.rows
    })
    .catch((err) => {
      console.log("Catch: ", err.message);
    });
}

const createTask = (body) => {
  const { task_name, date_time, priority } = body
  return pool
    .query('INSERT INTO tasks (user_id, task_name, priority, date_time) VALUES ($1, $2, $3, $4) RETURNING *', [1, task_name, priority, date_time])
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
  updateTask,
  textComplete
}