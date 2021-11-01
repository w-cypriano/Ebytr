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
const getAllTask = async () => {
  const db = await getConnection(); 
  const tasksList = await db.collection('tasks').find({}).toArray();
  const tasksAll = { tasks: [...tasksList] };
  return tasksAll;
};

const getById = async (id) => {
  const idSize = 24;
  if (id.length < idSize) return null;
  const db = await getConnection(); 
  const productsId = await db.collection('products').findOne({ _id: ObjectId(id) });
  if (!productsId) return null;
  return productsId;
};

const productUpdate = async (id, name, quantity) => {
  const db = await getConnection(); 
  const updatedProduct = await db.collection('products').findOneAndUpdate(
    { _id: ObjectId(id) }, 
    { $set: 
      { name, quantity },
    },
    { returnDocument: 'after' },
  );
  return updatedProduct.value;
};

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

module.exports = { createTask,  findByTask, taskDelete, getAllTask };