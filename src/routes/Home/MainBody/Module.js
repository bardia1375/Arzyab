import { createSlice } from "@reduxjs/toolkit";
import myApi from "config/axios";

const initialState = {
  // items: [],
  loading: false,
  oneItem: null,
  items: null,
  deletedItems: null,
  pagination: null,
};

const mainBodySlice = createSlice({
  name: "mainBody",
  initialState,
  reducers: {
    setLoading: () => {
      return {
        loading: true,
      };
    },
    setEmployees: (state, { payload }) => {
      return {
        items: payload.Result,
        pagination: payload.Pagination,
        loading: false,
      };
    },
    editEmployees: (state, { payload }) => {
      return {
        items: payload.Result,
        pagination: payload.Pagination,
        loading: false,
      };
    },
    setDeletedEmployees: (state, { payload }) => {
      return {
        deletedItems: payload.Result,
        pagination: payload.Pagination,
        loading: false,
      };
    },
    setOneEmployee: (state, { payload }) => {
      return {
        oneItem: payload.Result,
        loading: false,
      };
    },
  },
});

export const {
  setEmployees,
  editEmployees,
  setDeletedEmployees,
  setLoading,
  changeInformationMethodStatus,
  putEmployee,
  setOneEmployee,
} = mainBodySlice.actions;

export default mainBodySlice.reducer;

// fetch employees
export function fetchEmployees(Token, pageNumber, limitNumber) {
  return async (dispatch) => {
    dispatch(setLoading());
    myApi
      .get("Person/ListAll", {
        headers: { Authorization: `Bearer ${Token}` },
        params: { Page: pageNumber, Limit: limitNumber },
      })
      .then((response) => {
        dispatch(setEmployees(response.data));
      });
  };
}

// fetch one employee
export function oneEmployee(Token, unique) {
  return async (dispatch) => {
    dispatch(setLoading());
    myApi
      .get("Person/Get", {
        headers: { Authorization: `Bearer ${Token}` },
        params: { Unique: unique },
      })
      .then((response) => {
        dispatch(setOneEmployee(response.data));
      });
  };
}

// Add New employee
export function addNewEmployee(Token, data) {
  return async (dispatch) => {
    dispatch(setLoading());
    myApi
      .post("Person/Insert", data, {
        headers: { Authorization: `Bearer ${Token}` },
      })
      .then((response) => {
        dispatch(fetchEmployees(Token, 1, 10));
      });
  };
}

// delete employee
export function deleteEmployee(Token, unique) {
  return async (dispatch) => {
    // dispatch(setLoading());
    myApi
      .delete(`Person/Delete`, {
        headers: { Authorization: `Bearer ${Token}` },
        params: { Unique: unique },
      })
      .then((response) => {
        dispatch(fetchEmployees(Token, 1, 10));
      });
  };
}

// fetch deleted employees
export function fetchDeletedEmployees(Token, pageNumber, limitNumber) {
  return async (dispatch) => {
    dispatch(setLoading());
    myApi
      .get("Person/GetAllTrash", {
        headers: { Authorization: `Bearer ${Token}` },
        params: { Page: pageNumber, Limit: limitNumber },
      })
      .then((response) => {
        dispatch(setDeletedEmployees(response.data));
      });
  };
}

// Add New employee
export function recoverEmployee(Token, unique, currentPage) {
  return async (dispatch) => {
    // dispatch(setLoading());
    myApi
      .post(`Person/RecoverDeleted`, null, {
        headers: { Authorization: `Bearer ${Token}` },
        params: { Unique: unique },
      })
      .then((response) => {
        dispatch(fetchDeletedEmployees(Token, 1, 10));
      });
  };
}

// Edit employee
export function editEmployee(Token, data, currentPage, items) {
  return async (dispatch) => {
    dispatch(setLoading());
    myApi
      .put("Person/Edit", data, {
        headers: { Authorization: `Bearer ${Token}` },
      })
      .then((response) => {
        dispatch(fetchEmployees(Token, currentPage, 10));
      });
  };
}
