import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index";

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      status: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.editTask) {
      this.setState({
        id: nextProps.editTask.id,
        name: nextProps.editTask.name,
        status: nextProps.editTask.status,
      });
    } else {
      this.setState({
        id: "",
        name: "",
        status: false,
      });
    }
  }

  onCloseForm = () => {
    this.props.onCloseForm();
  };

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    if (name === "status") {
      value = value === "true" ? true : false;
    }
    this.setState({ [name]: value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSaveTask(this.state);
    this.onClear();
    this.onCloseForm();
  };

  onClear = () => {
    this.setState({
      name: "",
      status: false,
    });
  };
  render() {
    if (!this.props.isDisplayForm) return "";
    return (
      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title text-right">
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.onCloseForm}
              >
                Close Form
              </button>
            </h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>name:</label>
                <input
                  name="name"
                  className="form-control"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label>Trạng Thái:</label>
                <select
                  name="status"
                  className="form-control"
                  value={this.state.status}
                  onChange={this.onChange}
                >
                  <option value={false}>Ẩn</option>
                  <option value={true}>Hiện</option>
                </select>
              </div>
              <div className="form-group text-center">
                <button type="submit" className="btn btn-primary">
                  Lưu Lại
                </button>
                &nbsp;&nbsp;
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={this.onClear}
                >
                  Hủy Bỏ
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapSateToProps = (state) => {
  return {
    isDisplayForm: state.isDisplayForm,
    editTask: state.editTask,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSaveTask: (task) => {
      dispatch(actions.saveTask(task));
    },
    onCloseForm: () => {
      dispatch(actions.closeForm());
    },
  };
};
export default connect(mapSateToProps, mapDispatchToProps)(TaskForm);
