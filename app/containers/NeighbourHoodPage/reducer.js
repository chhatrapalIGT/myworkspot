import produce from 'immer';

import {
  FAILED_GET_OFFICE_ASSIGNMENTS,
  REQUEST_GET_OFFICE_ASSIGNMENTS,
  SUCCESS_GET_OFFICE_ASSIGNMENTS,
} from './constants';

// The initial state of the App
const initialState = {
  getOfficeLocation: {
    error: '',
    success: false,
    loading: false,
    message: '',
  },
};

/* eslint-disable default-case, no-param-reassign */
const NeighbourHoodReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REQUEST_GET_OFFICE_ASSIGNMENTS:
        draft.getOfficeLocation.loading = true;
        break;
      case SUCCESS_GET_OFFICE_ASSIGNMENTS:
        draft.getOfficeLocation.loading = false;
        draft.getOfficeLocation.success = true;
        draft.getOfficeLocation = action.payload;
        draft.getOfficeLocation.message = action.payload.message;
        break;
      case FAILED_GET_OFFICE_ASSIGNMENTS:
        draft.getOfficeLocation.loading = false;
        draft.getOfficeLocation.success = false;
        draft.getOfficeLocation.error = action.payload.message;
        break;
    }
  });
export default NeighbourHoodReducer;
