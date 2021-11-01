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

const getAll = async () => {
  const db = await getConnection(); 
  const productsList = await db.collection('products').find({}).toArray();
  const productsAll = { products: [...productsList] };
  return productsAll;
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


const taskDelete = rescue(async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await service.taskDelete(id);
  if (deletedProduct.err) {
    return res.status(422).json(deletedProduct);
  }
  res.status(200).json(deletedProduct);
});

module.exports = { createTask };