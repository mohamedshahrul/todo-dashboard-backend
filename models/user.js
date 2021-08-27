import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  displayName: { type: String, required: true },
  userId: { type: String, required: true },
  name: { type: String, required: true },
  id: { type: String },
});

const User = mongoose.model("User", userSchema);

export default User;
