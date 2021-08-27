import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import todoRoutes from "./routes/todo.js";
import userRoutes from "./routes/user.js";
import dotenv from "dotenv";
import morgan from "morgan";

const app = express();

dotenv.config();

//MiddleWare
app.use(morgan("dev"));

//Cors
app.use(cors());

//Body-Parser
app.use(express.json({ limit: "30mb", extented: true }));
app.use(express.urlencoded({ limit: "30mb", extented: true }));

//Router
app.use("/todos", todoRoutes);
app.use("/user", userRoutes);

//To test backend working or not
app.get("/", (req, res) => {
  res.send("Backend is Running");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server Running on port : ${PORT}`))
  )
  .catch((error) => console.log(error.message));

// mongoose.set("useFindAndModify", false);
