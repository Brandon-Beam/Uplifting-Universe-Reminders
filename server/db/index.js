require('dotenv').config()
const express = require('express')
const app = express()
const port = 3001
const { getTasks, createTask, deleteTask, updateTask } = require('./queries')


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
  getTasks()
    .then(response => {
      res.status(200).send(response);

    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.post('/tasks', (req, res) => {
  createTask(req.body)
    .then(response => {
      res.status(200).send(response)
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.put('/tasks/:id', (req, res) => {
  updateTask(req.body, req.params.id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.delete('/tasks/:id', (req, res) => {
  deleteTask(req.params.id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.post('/api/messages', (req, res) => {
  res.header('Content-Type', 'application/json');
  client.messages
    .create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.MY_NUMBER,
      body: req.body.body
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});

app.post('/api/cron', (req, res) => {
  res.header('Content-Type', 'application/json');
  client.messages
    .create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.MY_NUMBER,
      body: req.body.body
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})