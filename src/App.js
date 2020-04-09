import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';

class App extends Component {
  render() {
    return (
      <section id="myTodos">
        <h1>My ToDo List!</h1>
    <div id = "list">
    <Todo></Todo>
    </div>
    <NewTodo></NewTodo>
      </section>
    );
  }
}

export default App;
