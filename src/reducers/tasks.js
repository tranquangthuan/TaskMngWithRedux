import * as types from "../constants/ActionTypes";
var data = JSON.parse(localStorage.getItem("tasks"));
var initialState = data ? data : [];

var generateId = () => {
  return (
    Math.random().toString(36).substring(2, 151) +
    "-" +
    Math.random().toString(36).substring(2, 151)
  );
};

var myReducer = (state = initialState, action) => {
  var task = null;
  var index = -1;
  switch (action.type) {
    case types.LIST_ALL:
      return state;
    case types.SAVE_TASK:
      task = action.task;
      if (task.id) {
        for (var i = 0; i < state.length; i++) {
          let taskItem = state[i];
          if (taskItem.id === task.id) {
            index = i;
          }
        }
        if (index !== -1) {
          state[index] = {
            id: task.id,
            name: task.name,
            status: task.status,
          };
        }
      } else {
        var newTask = {
          id: generateId(),
          name: action.task.name,
          status: action.task.status,
        };
        state.push(newTask);
      }

      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];
    case types.TOGGLE_FORM:
      return state;

    case types.UPDATE_STATUS_TASK:
      task = action.task;
      index = state.indexOf(task);
      if (index !== -1) {
        state[index] = {
          id: task.id,
          name: task.name,
          status: !task.status,
        };
        localStorage.setItem("tasks", JSON.stringify(state));
      }
      return [...state];

    case types.DELETE_TASK:
      task = action.task;
      index = state.indexOf(task);
      if (index !== -1) {
        state.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(state));
      }
      return [...state];

    default:
      return state;
  }
};

export default myReducer;
