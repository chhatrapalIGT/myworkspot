import produce from 'immer';
import {
  REQUEST_UPDATE_ACTIVE_STATUS,
  SUCCESS_UPDATE_ACTIVE_STATUS,
  FAILED_UPDATE_ACTIVE_STATUS,
} from './constants';

// The initial state of the App
const initialState = {
  updateStatus: {
    loading: false,
    error: '',
    message: '',
    success: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const spaceReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REQUEST_UPDATE_ACTIVE_STATUS:
        draft.updateStatus.loading = true;
        draft.updateStatus.error = '';
        break;
      case SUCCESS_UPDATE_ACTIVE_STATUS:
        draft.updateStatus.loading = false;
        draft.updateStatus.success = action.payload.success;
        draft.updateStatus.message = action.payload.message;
        break;
      case FAILED_UPDATE_ACTIVE_STATUS:
        draft.updateStatus.loading = false;
        draft.updateStatus.success = false;
        draft.updateStatus.error = action.payload.Error;
        break;
    }
  });

export default spaceReducer;
