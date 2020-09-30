import React from "react";
import cn from "classnames";
import "./style.css";
import Plusicon from "../../images/plusicon";
import Arrowicon from "../../images/arrowicon";

export default class TaskAdd extends React.PureComponent {
  state = {
    isOpen: false,
    value: ""
  };

  onClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
    this.setState({ value: "", isOpen: false });
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  render() {
    const { isOpen, value } = this.state;

    return (
      <div>
        <div className={cn("add", { active: isOpen })} onClick={this.onClick}>
          {isOpen ? <Arrowicon /> : <Plusicon />}
        </div>
        {isOpen && (
          <form className="formAdd" onSubmit={this.onSubmit}>
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              placeholder="Adicionar tarefa"
            />
            <button disabled={!value}>Add</button>
          </form>
        )}
      </div>
    );
  }
}
