import express from "express";
import productRoutes from "./routes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));
const app = express();
const PORT = 3000;
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT);
app.use(express.json()); //body parser 내장 함수
app.use("/api/products", productRoutes);

console.log(`running on ${PORT}`);
