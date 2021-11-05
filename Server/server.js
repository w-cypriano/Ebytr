const express = require('express');
const bodyParser = require('body-parser');
const controllerTask = require('./src/controllers/controllerTask');
const { taskValidate, statusValidate, statusValidateExist } = require('./src/validations/taskValidation')

const PORT = 3000;
const app = express();
app.use(bodyParser.json())

app.post('/task', [taskValidate, statusValidate, controllerTask.createTask]);
app.get('/', controllerTask.getAllTask);
app.put('/task/:id', [taskValidate, statusValidateExist, controllerTask.updateTask]);
app.delete('/task/:id', controllerTask.deleteTask);


app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));