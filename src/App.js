import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';
let APIKey = "e283ab-116cce-335947-182e40-ca5f59";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {todos: [], todo_text: ""};
    this.add = this.add.bind(this);
    this.onChange = this.onChange.bind(this);
    this.deleteFromArray = this.deleteFromArray.bind(this);
  }
  sort = (event) => {
    let tobesorted = this.state.todos;
    let sorted = tobesorted.sort(function(a,b){
      return a.completed - b.completed;
    });
    this.setState({todos:sorted});
  }

  add = (event) => {
    event.preventDefault();
    let new_this = this;
    let input = new_this.state.todo_text;
    if (input !== "")
    {
        let data = {text: input}
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if (this.readyState === 4 && this.status === 200)
            {
                console.log("test1");
                let new_todos = new_this.state.todos;
                new_todos.push(JSON.parse(this.responseText));
                new_this.setState({todos: new_todos});
            }
            else if (this.readyState === 4)
            {
                console.log("we here?");
                console.log(this.responseText);
            }
            new_this.setState({todo_text:""});
        };
        xhttp.open("POST", "https://cse204.work/todos", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.setRequestHeader("x-api-key", APIKey);
        xhttp.send(JSON.stringify(data));
    }
  };
  onChange = (event) =>{
    let new_this = this;
    new_this.setState({todo_text:event.target.value});
  }
  componentDidMount = () => {
    let xhttp = new XMLHttpRequest();
    let new_this = this;
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let todos = JSON.parse(this.responseText);
        new_this.setState({todos:todos});
      }
  };
    xhttp.open("GET", "https://cse204.work/todos", true);
    xhttp.setRequestHeader("x-api-key",APIKey);
    xhttp.send();
  }

  deleteFromArray = (id) => {
    let new_this = this;
    const remainingTodos = new_this.state.todos.filter((todo) => {
    if (todo.id !== id) {
      return todo;
    }});
    new_this.setState({todos:remainingTodos});
  }

  render() {
    return (
      <section id="myTodos">
        <h1>My ToDo List!</h1>
    <div id = "list">
    {this.state.todos.map((todo) =>
      <Todo key={todo.id} todo_text={todo.text} id={todo.id} done={todo.completed} deleteFromArray={this.deleteFromArray} componentDidMount={this.componentDidMount}> </Todo>
    )}
    </div>
    <NewTodo add={this.add} todo_text={this.state.todo_text} onChange={this.onChange}></NewTodo>
    <button className="sort" onClick={this.sort}>Sort</button>
      </section>
    );
  }
}
export default App;
