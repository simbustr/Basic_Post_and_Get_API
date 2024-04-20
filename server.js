const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World! DB-Connection");
});

//creating Schema
const todoSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  description: String,
});

//creating model
const todoModel = mongoose.model("Todo", todoSchema);

//Create a new todo item
app.post("/todos", async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTodo = new todoModel({ title, description });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

//Get all items
app.get("/todos", async (req, res) => {
  try {
    const todos = await todoModel.find();
    res.json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

const port = 6000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// connecting mongodb
mongoose
  .connect("mongodb://localhost:27017/demo-app")
  .then(() => {
    console.log("DB Connected!");
  })
  .catch((err) => {
    console.log(err);
  });
