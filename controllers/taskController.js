const Task = require("../models/task");
const Joi = require("joi");

const getAllTasks = (req, res, next) => {
  Task.find()
    .then((tasks) => {
      res.status(200).json({ data: tasks });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
const createTask = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(422).json({ status: "failed", errors: error });
  }
  const task = new Task({ title: req.body.title });
  task
    .save()
    .then((task) => {
      res.status(200).json({ msg: "success", task: task });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const getTask = (req, res, next) => {
  const taskId = req.params.taskId;
  Task.findOne({ _id: taskId })
    .then((task) => {
      res.status(200).json({ data: task });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
const updateTask = (req, res, next) => {
  const taskId = req.params.taskId;
  const schema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(422).json({ status: "failed", errors: error });
  }
  Task.findOne({ _id: taskId })
    .then((task) => {
      task.title = req.body.title;
      task.save().then((result) => {
        res.status(200).json({ msg: "success", task: result });
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
const updateTaskStatus = (req, res, next) => {
  const taskId = req.params.taskId;
  const schema = Joi.object({
    status: Joi.string().required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(422).json({ status: "failed", errors: error });
  }
  Task.findOne({ _id: taskId })
    .then((task) => {
      if (!task) {
        res.status(422).json({ msg: "task not found" });
      }
      task.status = req.body.status;
      task.save().then((result) => {
        res.status(200).json({ msg: "success", task: result });
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
const deleteTask = (req, res, next) => {
  const taskId = req.params.taskId;
  Task.findOne({ _id: taskId })
    .then((task) => {
      task.deleteOne();
      res.status(200).json({ msg: "deleted" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
};
