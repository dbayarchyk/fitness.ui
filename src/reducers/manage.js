import * as types from '../actions/manage';

const defaultState = {
  isLoading: false,
  selectedItemId: null,
  activeType: null,
  items: {},
};

const manage = (state = defaultState, action) => {
  switch(action.type) {
    case types.SET_ACTIVE_TYPE:
      return {
        ...state,
        activeType: action.activeType,
      };
    case types.SET_SELECTED_ITEM_ID:
      return {
        ...state,
        selectedItemId: action.selectedItemId,
      };
    case types.GET_ITEMS_REQUEST_START:
    case types.REMOVE_ITEM_REQUEST_START:
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_ITEMS_REQUEST_SUCCESS: {
      let items = {};

      action.data.forEach((item) => { items = { ...items, [item._id]: item } });

      return {
        ...state,
        items,
        isLoading: false,
      };
    }
    case types.REMOVE_ITEM_REQUEST_SUCCESS: {
      const items = { ...state.items };

      delete items[state.selectedItemId];

      return {
        ...state,
        items,
        selectedItemId: null,
        isLoading: false,
      };
    }
    case types.GET_ITEMS_REQUEST_FAIL:
    case types.REMOVE_ITEM_REQUEST_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case types.RESET_DATA:
      return defaultState;
    default:
      return state;
  }
}

export default manage;