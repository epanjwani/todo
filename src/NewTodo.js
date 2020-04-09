import React, { Component } from 'react';
import './NewTodo.css';

class NewTodo extends Component {
  render() {
    return (
      <div id = "additem">
        <form id = "addform">
        <input type = "text" id = "additemform" placeholder = "Add an item!"></input>
        <button id = "additembutton" type = "submit">Add</button>
        </form>
      </div>
    );
  }
}

export default NewTodo;
