import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index";

class TaskItem extends React.Component {
  onUpdateStatus = (task) => {
    this.props.onUpdateStatus(task);
  };

  onDelete = (task) => {
    this.props.onDelete(task);
    this.props.onCloseForm();
  };

  onEditTask = (task) => {
    this.props.onOpenForm();
    this.props.onEditTask(task);
  };

  render() {
    var { task, index } = this.props;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{task.name}</td>
        <td>
          <button
            type="button"
            className={task.status ? "btn btn-success" : "btn btn-warning"}
            onClick={() => this.onUpdateStatus(task)}
          >
            {task.status ? "Kich hoat" : "An"}
          </button>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => this.onDelete(task)}
          >
            Xóa
          </button>
          <button
            type="button"
            className="btn btn-info ml-15"
            onClick={() => this.onEditTask(task)}
          >
            Sửa
          </button>
        </td>
      </tr>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onUpdateStatus: (task) => {
      dispatch(actions.updateStatus(task));
    },
    onDelete: (task) => {
      dispatch(actions.deleteTask(task));
    },
    onCloseForm: () => {
      dispatch(actions.closeForm());
    },
    onOpenForm: () => {
      dispatch(actions.openForm());
    },
    onEditTask: (task) => {
      dispatch(actions.editTask(task));
    },
  };
};

export default connect(null, mapDispatchToProps)(TaskItem);
