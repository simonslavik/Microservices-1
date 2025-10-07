const express = require("express");
const mongoose = require("mongoose");

const app = express()

const PORT = process.env.PORT || 3002;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Failed to connect to MongoDB", err);
});

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  userId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Task = mongoose.model("Task", taskSchema);

app.post("/tasks", async (req, res) => {
  const { title, description, userId } = req.body;
  if (!title || !description || !userId) {
    return res.status(400).send("Title, description, and userId are required");
  }
  const task = new Task({ title, description, userId });
  await task.save();
  res.status(201).send(task);
    
});

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  if (tasks) {
    res.send(tasks);
  } else {
    res.status(404).send("No tasks found");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
