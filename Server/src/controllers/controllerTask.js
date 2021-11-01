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

const taskDelete = rescue(async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await service.taskDelete(id);
  if (deletedProduct.err) {
    return res.status(422).json(deletedProduct);
  }
  res.status(200).json(deletedProduct);
});

module.exports = { createTask, getAllTask };