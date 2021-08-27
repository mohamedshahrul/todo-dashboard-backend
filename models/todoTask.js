import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  task: String,
  completed: Boolean,
  userId: String,
});

const TodoTask = mongoose.model("todoTask", todoSchema);

export default TodoTask;
