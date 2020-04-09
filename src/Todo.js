import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {
  render() {
    return (
        <div id="test" className="item">
        <p className ="itemtext">Test</p>
        <button className="delete">Delete</button>
        <button className="check">Check</button>
      </div> 
    );
  }
}

export default Todo;
