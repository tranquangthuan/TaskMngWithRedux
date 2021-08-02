import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
    };
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };

  onSearch = () => {
    this.props.onSearch(this.state.keyword);
  };

  render() {
    return (
      <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
        <div className="input-group">
          <input
            type="text"
            name="keyword"
            className="form-control"
            placeholder="Search"
            value={this.state.keyword}
            onChange={this.onChange}
          />
          <div className="input-group-btn">
            <button className="btn btn-default" onClick={this.onSearch}>
              <i className="glyphicon glyphicon-search"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSearch: (keyword) => {
      dispatch(actions.search(keyword));
    },
  };
};

export default connect(null, mapDispatchToProps)(Search);
