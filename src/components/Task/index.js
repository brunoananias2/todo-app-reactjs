import React from "react";
import cn from "classnames";
import "./style.css";
import Saveicon from "../../images/saveicon";
import Editicon from "../../images/editicon";
import Deleteicon from "../../images/deleteicon";
import Checkicon from "../../images/checkicon";

export default class Task extends React.Component {
  state = {
    value: this.props.task.title,
    edited: false
  };

  handleCheck = e => {
    this.props.handleCheck(this.props.idx);
  };

  deleteTask = e => {
    this.props.deleteTask(this.props.idx);
  };

  editTask = () => {
    const { edited } = this.state;
    this.setState({ edited: !edited });
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value: value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.value, this.props.idx);
    const { edited } = this.state;
    this.setState({ edited: !edited });
  };

  render() {
    const { edited, value } = this.state;

    return (
      <div className="task">
        {edited ? (
          <div className="taskContent">
            <form className="formEdit" onSubmit={this.onSubmit}>
              <input type="text" value={value} onChange={this.handleChange} />
              <div className="buttons">
                <button className="save" disabled={!this.state.value}>
                  <Saveicon />
                </button>
              </div>
            </form>
          </div>
        ) : (
            <div className="taskContent">
              <label className={cn("taskCheck", { active: this.props.completed })}>
                <span className="taskCheckImg">
                  <Checkicon />
                </span>
                <input type="checkbox" name="box" onChange={this.handleCheck} />
                <p>{this.props.task.title}</p>
              </label>
              <div className="buttons">
                <div className="edit" onClick={this.editTask} title="Edit">
                  <Editicon />
                </div>
                <div
                  className="delete"
                  onClick={this.deleteTask}
                  title="Delete"
                >
                  <Deleteicon />
                </div>
              </div>
            </div>
          )}
      </div>
    );
  }
}
