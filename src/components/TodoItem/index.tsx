import * as React from "react";
import {Component} from "react";
import {Checkbox, TableCell, TableRow, Tooltip, Typography} from "@material-ui/core";
import {observer} from "mobx-react";
import {action} from "mobx";
import TodoModel from "../../models/TodoModel";
import "./index.scss";
import DeleteIcon from "@material-ui/icons/Delete";
import SimpleSlider from "../SimpleSlider/index";

interface ITodoItemProps {
  todo: TodoModel
}

function withStrike(WrappedComponent: any, todo: TodoModel) {
  return class extends React.Component {
    constructor(props: any) {
      super(props);
    }

    render() {
      const {done} = todo;
      return <WrappedComponent align="left" className={done ? "strike" : ""} {...this.props} />;
    }
  };
}

@observer
export default class extends Component<ITodoItemProps> {

  @action
  handleToggle = () => {
    this.props.todo.toggle();
  };

  @action
  handleDelete = () => {
    this.props.todo.remove();
  };


  render() {
    const {todo} = this.props;
    const {description, importance, urgency, priority, done} = todo;
    const TableCellWithStrike = withStrike(TableCell, todo);

    return (
      <TableRow className={[done ? "done" : "undone", "todo-item"].join(" ")}>
        <TableCellWithStrike>
          <div className="todo-action-flex">
            <Tooltip title="mark as done">
              <div className="todo-done-checkbox">
                <Checkbox
                  checked={done}
                  onChange={this.handleToggle}
                />
              </div>
            </Tooltip>
            <Tooltip title="delete todo">
              <div className="todo-delete-icon">
                <DeleteIcon onClick={this.handleDelete}/>
              </div>
            </Tooltip>
          </div>
        </TableCellWithStrike>
        <TableCellWithStrike>
          {description}
        </TableCellWithStrike>
        <TableCellWithStrike>
          <SimpleSlider defaultValue={urgency} handleChange={todo.setUrgency} disabled={done}/>
        </TableCellWithStrike>
        <TableCellWithStrike>
          <SimpleSlider defaultValue={importance} handleChange={todo.setImportance} disabled={done}/>
        </TableCellWithStrike>
        <Tooltip title="priopriry = important + urgent" aria-label="Add">
          <TableCellWithStrike>
            <Typography color={"secondary"} variant={"h5"}>
              {priority}
            </Typography>
          </TableCellWithStrike>
        </Tooltip>
      </TableRow>
    );
  }
};
