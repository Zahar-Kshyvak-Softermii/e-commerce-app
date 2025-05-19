const { Todo } = require("../models");

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll({ where: { userId: req.userId } });
    res.json(todos);
  } catch (e) {
    res.status(500).json({ message: "Server error!" });
  }
};

const createTodo = async (req, res) => {
  const userId = req.userId;

  try {
    const { title, description } = req.body;
    const todo = await Todo.create({ title, description, userId });
    res.status(201).json(todo);
  } catch (e) {
    res.status(500).json({ message: "Server error!" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const todo = await Todo.findOne({ where: { id, userId: req.userId } });
    if (!todo)
      return res.status(404).json({ message: "Todo has not been found!" });

    todo.title = title ?? todo.title;
    todo.description = description ?? todo.description;
    await todo.save();

    res.json(todo);
  } catch (e) {
    res.status(500).json({ message: "Server error!" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOne({ where: { id, userId: req.userId } });
    if (!todo)
      return res.status(404).json({ message: "Todo has not been found!" });

    await todo.destroy();
    res.json({ message: "Todo has been successfully deleted!" });
  } catch (e) {
    res.status(500).json({ message: "Server error!" });
  }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
