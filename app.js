const express = require("express");
let tasks = require("./tasks");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const id = tasks[tasks.length - 1].id + 1;
  const newTask = { id, done: false, ...req.body };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put("/tasks/:taskId", (req, res) => {
  const { taskId } = req.params;
  const foundTask = tasks.find((task) => task.id === +taskId);
  if (foundTask) {
    foundTask.done = !foundTask.done;
    res.status(204).end();
  } else {
    res.status(404).json({ message: "you didnt mention this task" });
  }
});

app.delete("/tasks/:taskId", async (req, res) => {
  const { taskId } = req.params;
  const foundTask = tasks.find((task) => task.id === +taskId);
  if (foundTask) {
    tasks = tasks.filter((_task) => _task !== foundTask);
    res.status(204).end();
  } else {
    res.status(404);
    res.json({ message: "you didnt mention this task" });
  }
});

app.listen(8000, () => {
  console.log(" the project is running on localhost:8000");
});
