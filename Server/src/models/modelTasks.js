const getConnection = require('./connection');
const { ObjectId } = require('mongodb')

const createTask = async (task, status) => {
  const db = await getConnection();
  await db.collection('tasks').insertOne({ task, status });
  const newTaskList = getAllTask();
  return newTaskList;
};

const findByTask = async (task) => {
  const db = await getConnection();
  const searchTask = await db.collection('tasks').findOne({ task });

  if (!searchTask) return null;
  return searchTask; 
}
const getAllTask = async () => {
  const db = await getConnection(); 
  const tasksList = await db.collection('tasks').find({}).toArray();
  const tasksAll = { tasks: [...tasksList] };
  return tasksAll;
};

const getTaskById = async (id) => {
  const idSize = 24;
  if (id.length < idSize) return null;
  const db = await getConnection(); 
  const taskId = await db.collection('tasks').findOne({ _id: ObjectId(id) });
  if (!taskId) return null;
  return taskId;
};

const updateTask = async (id, task, status) => {
  const db = await getConnection(); 
  const updatedTask = await db.collection('tasks').findOneAndUpdate(
    { _id: ObjectId(id) }, 
    { $set: 
      { task, status },
    },
  );
  const newTaskList = getAllTask();
  return newTaskList;
};

const deleteTask = async (id) => {
  const db = await getConnection();
  const isDelete = await db.collection('tasks').findOne({ _id: ObjectId(id) });
  if (isDelete) {
    const deletedProduct = await db.collection('tasks').deleteOne(
      { _id: ObjectId(id) }, 
    );
  }
  const newTaskList = getAllTask();
  return newTaskList
};

module.exports = { createTask,  findByTask, deleteTask, getAllTask, updateTask, getTaskById  };