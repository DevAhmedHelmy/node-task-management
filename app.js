const express = require("express");
const app = express();

const tasksRoute = require("./routes/tasks");
const authRoute = require("./routes/auth");
const mongoose = require("mongoose");

app.use(express.json());

app.use("/api/v2/", tasksRoute);
app.use("/api/v2/auth/", authRoute);
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});
mongoose
  .connect("mongodb://localhost:27017/task_management")
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
