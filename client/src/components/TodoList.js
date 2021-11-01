import React, { Component } from 'react';

function TodoList(tasksList) {
  const { tasks } = tasksList;
  console.log('todolist',tasks);
    return ( 
      <div>
        <h1>
          {/*tasks.map((task) => {
          task.task 
          task.status
        })*/}
        </h1>
      </div>
    );
}
 
export default TodoList;