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
const taskDelete = async (id) => {
  const deletedProduct = await model.taskDelete(id);
  return deletedProduct;
};

module.exports = { createTask, taskDelete };  