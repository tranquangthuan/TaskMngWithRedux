import React from "react";
import TaskItem from "./TaskItem";
import { connect } from "react-redux";
import * as actions from "../actions/index";

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: "",
      filterStatus: -1, //-1 all, 0 active, 1 inactive
    };
  }
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    var filter = {
      name: name === "filterName" ? value : this.state.filterName,
      status:
        name === "filterStatus" ? parseInt(value) : this.state.filterStatus,
    };
    this.props.onFilter(filter);
    this.setState({ [name]: value });
  };

  render() {
    var { tasks, filter, keyword, sort } = this.props;
    if (filter.name) {
      tasks = tasks.filter((task) => {
        return (
          task.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1
        );
      });
    }
    tasks = tasks.filter((task) => {
      if (filter.status === -1) {
        return true;
      } else {
        return task.status === (filter.status === 1 ? true : false);
      }
    });

    // search
    if (keyword) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      });
    }

    // sort
    if (sort.by === "name") {
      tasks.sort((a, b) => {
        if (a.name > b.name) return sort.value;
        else if (a.name < b.name) return -sort.value;
        else return 0;
      });
    } else if (sort.by === "status") {
      tasks.sort((a, b) => {
        if (a.status < b.status) return sort.value;
        else if (a.status > b.status) return -sort.value;
        else return 0;
      });
    }

    var elementTask = tasks.map((task, index) => {
      return <TaskItem key={task.id} task={task} index={index} />;
    });

    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Trạng Thái</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <input
                type="text"
                name="filterName"
                className="form-control"
                value={this.state.filterName}
                onChange={this.onChange}
              />
            </td>
            <td>
              <select
                name="filterStatus"
                className="form-control"
                value={this.state.filterStatus}
                onChange={this.onChange}
              >
                <option value="-1">Tất cả</option>
                <option value="0">Ẩn</option>
                <option value="1">Hiện</option>
              </select>
            </td>
            <td></td>
          </tr>
          {elementTask}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    filter: state.filter,
    keyword: state.search,
    sort: state.sort,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onFilter: (filter) => {
      dispatch(actions.filter(filter));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
