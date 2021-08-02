import * as types from "./../constants/ActionTypes";
export const listAll = () => {
  return {
    type: types.LIST_ALL,
  };
};

export const saveTask = (task) => {
  return {
    type: types.SAVE_TASK,
    task: task,
  };
};

export const toggleForm = () => {
  return {
    type: types.TOGGLE_FORM,
  };
};

export const openForm = () => {
  return {
    type: types.OPEN_FORM,
  };
};

export const closeForm = () => {
  return {
    type: types.CLOSE_FORM,
  };
};

export const updateStatus = (task) => {
  return {
    type: types.UPDATE_STATUS_TASK,
    task: task,
  };
};

export const deleteTask = (task) => {
  return {
    type: types.DELETE_TASK,
    task: task,
  };
};

export const editTask = (task) => {
  return {
    type: types.EDIT_TASK,
    task: task,
  };
};

export const filter = (filter) => {
  return {
    type: types.FILTER_TASK,
    filter: filter,
  };
};

export const search = (keyword) => {
  return {
    type: types.SEARCH_TASK,
    keyword: keyword,
  };
};

export const sortTask = (sort) => {
  return {
    type: types.SORT_TASK,
    sort: sort,
  };
};