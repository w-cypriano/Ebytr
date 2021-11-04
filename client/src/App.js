import React, { Component, useState } from 'react';
import MyContext from './contexts/myContext'
import Home from './components/Home';
import Header from './components/Header';
import TodoList from './components/TodoList';

function App() {
  const [tasksList, setTasksList] = useState([]);
  return (
    <MyContext.Provider value={{tasksList, setTasksList}}>
      <Header/>
      <Home/>
      <TodoList/>
    </MyContext.Provider>
  );
}

export default App;
