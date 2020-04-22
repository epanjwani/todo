import React, { Component } from 'react';
import './App.css';
let APIKey = "e283ab-116cce-335947-182e40-ca5f59";

class Todo extends Component {
  constructor(props){
    super(props);
    this.state = {done: this.props.done, deleted:this.props.deleted}
    this.check = this.check.bind(this);
    this.delete = this.delete.bind(this);
  }
  check = (event) => {
    let new_this = this;
    let result;
    let id = this.props.id;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200)
        {
            result = JSON.parse(this.responseText);
            if (result.completed === false)
            {
                let xhttp2 = new XMLHttpRequest();
                let data = {completed: true};
                xhttp2.onreadystatechange = function(){
                if (this.readyState === 4 && this.status === 200)
                {
                  new_this.setState({done:true});
                  new_this.props.componentDidMount();
                }
                else if (this.readyState === 4)
                {
                    console.log(this.responseText);
                }
                };
                let strtopass = ("https://cse204.work/todos/").concat(id);
                xhttp2.open("PUT", strtopass, true);
                xhttp2.setRequestHeader("x-api-key", APIKey);
                xhttp2.setRequestHeader("Content-type", "application/json");
                xhttp2.send(JSON.stringify(data));
            }
        }
        else if (this.readyState === 4)
        {
            console.log(this.responseText);
        }
    };
    let strtopass = ("https://cse204.work/todos/").concat(id);
    xhttp.open("GET", strtopass, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("x-api-key", APIKey);
    xhttp.send();
  }

  delete = (event) => {
    let new_this = this;
    let xhttp = new XMLHttpRequest();
    let id = this.props.id;
    xhttp.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200)
        {
            new_this.setState({deleted:true});
            new_this.props.deleteFromArray(new_this.props.id);
        }
        else if (this.readyState === 4)
        {
            console.log(this.responseText);
        }
    };
    let strtopass = ("https://cse204.work/todos/").concat(id);
    xhttp.open("DELETE", strtopass, true);
    xhttp.setRequestHeader("x-api-key", APIKey);
    xhttp.send();
  }

  render() {
    let str = ""
    if (this.props.done === true)
    {
      str = "strike";
    }
    else
    {
      str = "nostrike";
    }
    return (
        <div id={this.props.id} className={str}>
        <p id = "itemtext" className ="itemtext">{this.props.todo_text}</p>
        <button className="delete" onClick={this.delete}>Delete</button>
        <button className="check" onClick={this.check}>Check</button>
      </div> 
    );
  }
}

export default Todo;
