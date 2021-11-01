const model = require('../models/modelTasks');

const createTask = async (task, status) => {
    const existingTask = await model.findByTask(task);
    if (existingTask) {
      return {
        err: { message: 'Task already registered' },
      };
    }   
    return model.createTask(task, status);
};

const getAllTask = async () => {
const allTasks = model.getAllTask();
  if (!allTasks) {
    return {
      err: { message: 'Tasks not found'},
    };
  }
  return allTasks
};

const updateTask = async (id, task, status) => {
  const existingId = await model.getTaskById(id);
    if (!existingId) {
      return {
        err: { message: 'Id not found' },
      };
    }   
  const updatedTask = await model.updateTask(id, task, status);
  return updatedTask;
};

const deleteTask = async (id) => {
  const existingId = await model.getTaskById(id);
    if (!existingId) {
      return {
        err: { message: 'Id not found' },
      };
    }  
  const newTaskList = await model.deleteTask(id);
  return newTaskList;
};

module.exports = { createTask, deleteTask, getAllTask, updateTask };  