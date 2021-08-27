import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signin = async (req, res) => {
  const { id, name } = req.body;
  try {
    const existingUser = await User.findOne({ userId: id });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    const isNameCorrect = await bcrypt.compare(name, existingUser.name);

    if (!isNameCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: existingUser.userId, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went Wrong" });
  }
};

export const signup = async (req, res) => {
  const { id, name } = req.body;
  try {
    const existingUser = await User.findOne({ userId: id });
    if (existingUser)
      return res.status(400).json({ message: "User already exist." });

    // if (password !== confirmPassword)
    //   return res.status(400).json({ message: "Password don't match" });

    const hashedName = await bcrypt.hash(name, 12);

    const result = await User.create({
      displayName: name,
      userId: id,
      name: hashedName,
    });

    const token = jwt.sign({ userId: result.userId, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went Wrong" });
  }
};
