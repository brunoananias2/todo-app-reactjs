import React from "react";
import Task from "../../components/Task/";
import Search from "../../components/Search/index";
import Filters from "../../components/Filters/index";
import TaskAdd from "../../components/TaskAdd/index";
import "./style.css";

export default class Main extends React.Component {
  state = {
    tasks: [],
    value: "",
    edited: false,
    selected: "all"
  };

  componentDidMount() {
    fetch("http://todo-brunoananias.herokuapp.com/api/todo")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          tasks: res
        });
      });

  }

  handleCheck = idx => {
    const { tasks } = this.state;
    const task = tasks[idx];
    tasks.splice(idx, 1);
    task.completed = !task.completed;
    task.completed ? tasks.push(task) : tasks.unshift(task);
    this.setState({ tasks: tasks });

    fetch("http://todo-brunoananias.herokuapp.com/api/todo/" + task.id, {
      method: "PUT",
      body: JSON.stringify({
        completed: task.completed
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => response.json())
  };

  saveTask = (value, idx) => {
    const { tasks } = this.state;
    const task = tasks[idx];
    task.title = value;
    this.setState({ tasks: tasks });
    fetch("http://todo-brunoananias.herokuapp.com/api/todo/" + task.id, {
      method: "PUT",
      body: JSON.stringify({
        title: task.title
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => response.json())
  };
  deleteTask = idx => {
    const { tasks } = this.state;
    const task = tasks[idx];
    tasks.splice(idx, 1);
    console.log(task);
    this.setState({ tasks: tasks });

    fetch('http://todo-brunoananias.herokuapp.com/api/todo/' + task.id, {
      method: "DELETE",
    })
      .then(res => res.json()) // or res.json()
      .then(res => console.log(res))
  };

  onSearch = value => {
    this.setState({ value: value });
  };

  handleSubmit = title => {
    const newtask = { title: title, completed: false };
    const newtasks = [newtask, ...this.state.tasks];
    this.setState({ tasks: newtasks });
    fetch("http://todo-brunoananias.herokuapp.com/api/todo", {
      method: "POST",
      body: JSON.stringify(newtask),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
  };

  handleRadio = name => {
    this.setState({ selected: name });
  };

  visibleTasks = () => {
    const { tasks, selected } = this.state;
    let filterState = null;
    switch (selected) {
      case "complete":
        return (filterState = tasks.filter(task => task.completed));
      case "incomplete":
        return (filterState = tasks.filter(task => !task.completed));
      default:
        return (filterState = tasks);
    }
  };

  clearCompleted = () => {
    this.setState({ tasks: this.state.tasks.filter(task => !task.completed) });
    localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
  };

  render() {
    const { tasks, value, selected } = this.state;
    const visibleTasks = this.visibleTasks();
    const filteredTasks = visibleTasks.filter(({ title }) =>
      new RegExp(value, "i").test(title)
    );

    return (
      <div className="wrapper">
        <div className="container">
          <header className="header">
            <h1>Todo App</h1>
          </header>
          <div className="app">
            <div className="settings">
              <Search onSearch={this.onSearch} value={this.state.value} />
              <Filters
                tasks={tasks}
                selected={selected}
                handleRadio={this.handleRadio}
              />
            </div>
            <h3>Todas as tarefas: {tasks.length}</h3>
            <div className="list">
              {filteredTasks.map((task, idx) => (
                <Task
                  task={task}
                  key={idx}
                  idx={idx}
                  id={task.id}
                  completed={task.completed}
                  handleCheck={this.handleCheck}
                  saveTask={this.saveTask}
                  deleteTask={this.deleteTask}
                  onSubmit={this.saveTask}
                />
              ))}
            </div>
            <TaskAdd onSubmit={this.handleSubmit} />
          </div>
        </div>
      </div>
    );
  }
}
