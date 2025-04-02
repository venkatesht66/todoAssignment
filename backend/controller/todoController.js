const Todo = require('../models/Todo');

// Create a new to-do
const createTodo = async (req, res) => {
  try {
    if (!req.body.text) {
      return res.status(400).json({ error: "Text field is required" });
    }

    const newTodo = new Todo({ text: req.body.text });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to create to-do", details: error.message });
  }
};

// Get all to-dos
const getTodo = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch to-dos", details: error.message });
  }
};

// Delete a to-do by ID
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "To-do not found" });
    }
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete to-do", details: error.message });
  }
};

module.exports = { createTodo, getTodo, deleteTodo };