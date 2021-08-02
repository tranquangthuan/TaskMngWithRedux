import React from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import Control from "./components/Control";
import TaskList from "./components/TaskList";
import { connect } from "react-redux";
import * as actions from "./actions/index";

class App extends React.Component {
  generateData = () => {
    var tasks = [
      {
        id: 1,
        name: "A",
        status: true,
      },
      {
        id: 2,
        name: "B",
        status: false,
      },
      {
        id: 3,
        name: "C",
        status: true,
      },
    ];
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  onToggleForm = () => {
    var { editTask } = this.props;
    if (editTask && editTask.id !== "") {
      this.props.onOpenForm();
    } else {
      this.props.onToggleForm();
    }
    this.props.onClearTask({
      id: "",
      name: "",
      status: false,
    });
  };

  render() {
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản lý công việc</h1>
        </div>

        <div className="row">
          <div className="row">
            {/* Them cong viec Left*/}
            <TaskForm />

            {/* Search - Sort */}
            <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.onToggleForm}
                >
                  Thêm công việc
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.generateData}
                >
                  Generate Data
                </button>
              </div>
              <Control />
            </div>

            {/* Table */}

            <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isDisplayForm: state.isDisplayForm,
    editTask: state.editTask,
  };
};

const mapDispatchToProps = (dispatch, action) => {
  return {
    onToggleForm: () => {
      dispatch(actions.toggleForm());
    },
    onOpenForm: () => {
      dispatch(actions.openForm());
    },
    onClearTask: (task) => {
      dispatch(actions.editTask(task));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
