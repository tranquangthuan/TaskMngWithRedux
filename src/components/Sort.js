import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index";

class Sort extends React.Component {
  onClick = (by, value) => {
    this.props.onSort({ by, value });
  };

  render() {
    var { by, value } = this.props.sort;
    return (
      <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          data-toggle="dropdown"
        >
          Sort <span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
          <li
            onClick={() => this.onClick("name", 1)}
            className={by === "name" && value === 1 ? "active" : ""}
          >
            <a href="/#">Name A - Z</a>
          </li>
          <li
            onClick={() => this.onClick("name", -1)}
            className={by === "name" && value === -1 ? "active" : ""}
          >
            <a href="/#">Name Z- A</a>
          </li>
          <li className="divider"></li>
          <li
            onClick={() => this.onClick("status", 1)}
            className={by === "status" && value === 1 ? "active" : ""}
          >
            <a href="/#">Status : Active</a>
          </li>
          <li
            onClick={() => this.onClick("status", -1)}
            className={by === "status" && value === -1 ? "active" : ""}
          >
            <a href="/#">Status : Hide</a>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sort: state.sort,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSort: (sort) => {
      dispatch(actions.sortTask(sort));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sort);
