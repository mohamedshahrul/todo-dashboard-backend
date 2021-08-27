import mongoose from "mongoose";
import TodoTask from "../models/todoTask.js";

export const getDashboard = async (req, res) => {
  const { id: userId } = req.params;
  console.log(userId);
  try {
    const todos = await TodoTask.find({ userId: userId });

    res.status(200).json({
      data: todos,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const task = new RegExp(searchQuery, "i"); //i means ignore case -> TEst=test=TEST
    const posts = await TodoTask.find({
      $or: [{ task }],
    });
    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  const Task = req.body;
  const newTask = new TodoTask({
    ...Task,
  });
  try {
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  const { id: _id } = req.params;
  const task = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No task with that id");
  const updatedtask = await TodoTask.findByIdAndUpdate(_id, task, {
    new: true,
  });

  res.json(updatedtask);
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Task with that id");

  await TodoTask.findByIdAndRemove(id);

  res.json({ message: "Task deleted successfully" });
};
