const getConnection = require('./connection');
const { ObjectId } = require('mongodb')

const createTask = async (task, status) => {
  const db = await getConnection();
  await db.collection('tasks').insertOne({ task, status });
  const createdTask = await findByTask(task);
  return createdTask;
};

const findByTask = async (task) => {
  const db = await getConnection();
  const searchTask = await db.collection('tasks').findOne({ task });
  if (!searchTask) return null;
  return searchTask; 
}
const taskDelete = async (id) => {
  const db = await getConnection();
  const isDelete = await db.collection('tasks').findOne({ _id: ObjectId(id) });
  if (isDelete) {
    const deletedProduct = await db.collection('tasks').deleteOne(
      { _id: ObjectId(id) }, 
    );
  if (deletedProduct !== isDelete) return isDelete;
  }
};

module.exports = { createTask,  findByTask, taskDelete };