import { actions as toastrActions } from 'react-redux-toastr';

import * as manageService from '../services/manage.service';

export const SET_ACTIVE_TYPE = 'SET_ACTIVE_TYPE';
export const SET_SELECTED_ITEM_ID = 'SET_SELECTED_ITEM_ID';
export const RESET_DATA = 'RESET_DATA';

export const GET_ITEMS_REQUEST_START = 'GET_ITEMS_REQUEST_START';
export const GET_ITEMS_REQUEST_SUCCESS = 'GET_ITEMS_REQUEST_SUCCESS';
export const GET_ITEMS_REQUEST_FAIL = 'GET_ITEMS_REQUEST_FAIL';

export const REMOVE_ITEM_REQUEST_START = 'REMOVE_ITEM_REQUEST_START';
export const REMOVE_ITEM_REQUEST_SUCCESS = 'REMOVE_ITEM_REQUEST_SUCCESS';
export const REMOVE_ITEM_REQUEST_FAIL = 'REMOVE_ITEM_REQUEST_FAIL';

export const setActiveType = activeType => ({
  type: SET_ACTIVE_TYPE,
  activeType,
});

export const setSelectedItemId = selectedItemId => ({
  type: SET_SELECTED_ITEM_ID,
  selectedItemId,
});

export const resetData = () => ({ type: RESET_DATA });

export const getItemsRequestStart = () => ({ type: GET_ITEMS_REQUEST_START });
export const getItemsRequestSuccess = data => ({
  type: GET_ITEMS_REQUEST_SUCCESS,
  data,
});
export const getItemsRequestFail = () => ({ type: GET_ITEMS_REQUEST_FAIL });

export const getItems = query => (dispatch, getState) => {
  dispatch(getItemsRequestStart());
  const activeType = getState().manage.activeType;

  manageService.getItems(query, activeType)
    .then(({ data }) => dispatch(getItemsRequestSuccess(data)))
    .catch(err => dispatch(getItemsRequestFail()));
};

export const removeItemRequestStart = () => ({ type: REMOVE_ITEM_REQUEST_START });
export const removeItemRequestSuccess = data => ({
  type: REMOVE_ITEM_REQUEST_SUCCESS,
  data,
});
export const removeItemRequestFail = () => ({ type: REMOVE_ITEM_REQUEST_FAIL });

export const removeItem = mutate => (dispatch, getState) => {
  dispatch(removeItemRequestStart());
  const activeType = getState().manage.activeType;
  const id = getState().manage.selectedItemId;

  manageService.removeItem(mutate, activeType, id)
    .then(({ data }) => dispatch(removeItemRequestSuccess(data)))
    .catch(err => dispatch(removeItemRequestFail()));
};