const express = require('express');
const rescue = require('express-rescue');
const bodyparser = require('body-parser');

const app = express();
app.use(bodyparser.json());
const service = require('../services/serviceTask');

const createTask = rescue(async (req, res) => {
  const { task, status } = req.body;
  
  const createdTask = await service.createTask(task, status);
  if (createdTask.err) {
    return res.status(409).json(createdTask.err);
  }
  if (createdTask.message) {
    return res.status(400).json(createdTask);
  }
  return res.status(201).json(createdTask);
});

const getAllTask = rescue(async (req, res) => {
  const allTasks = await service.getAllTask();
  if (allTasks.err) {
    return res.status(409).json(allTasks.err);
  }
  res.status(200).json(allTasks);
});

const updateTask = rescue(async (req, res) => {
  const { id } = req.params;
  const { task, status } = req.body;
  const updatedTask = await service.updateTask(id, task, status);
  if (updatedTask.err) {
    return res.status(422).json(updatedTask.err);
  }
  res.status(200).json(updatedTask) ;
});

const deleteTask = rescue(async (req, res) => {
  const { id } = req.params;
  const newTaskList = await service.deleteTask(id);
  if (newTaskList.err) {
    return res.status(422).json(newTaskList);
  }
  res.status(200).json(newTaskList);
});

module.exports = { createTask, getAllTask, deleteTask, updateTask };