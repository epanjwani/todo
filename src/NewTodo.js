import React, { Component } from 'react';
import './App.css';

class NewTodo extends Component {
  render() {
    return (
      <div id = "additem">
        <form id = "addform">
        <input type = "text" class = "additemform" id = {this.props.id} placeholder = "Add an item!" value = {this.props.todo_text} onChange={this.props.onChange}></input>
        <button id = "additembutton" type = "submit" onClick={this.props.add}>Add</button>
        </form>
      </div>
    );
  }
}

export default NewTodo;
