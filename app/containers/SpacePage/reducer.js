import produce from 'immer';
import {
  REQUEST_UPDATE_ACTIVE_STATUS,
  SUCCESS_UPDATE_ACTIVE_STATUS,
  FAILED_UPDATE_ACTIVE_STATUS,
  CLEAR_UPDATE_STATUS,
  CLEAR_MESSAGE,
} from './constants';

// The initial state of the App
const initialState = {
  updateStatus: {
    loading: false,
    error: '',
    message: '',
    success: false,
  },
  showUpdateStatusSuccess: false,
  showUpdateStatusMessage: '',
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
        draft.showUpdateStatusSuccess = action.payload.success;
        draft.showUpdateStatusMessage = action.payload.message;
        break;
      case FAILED_UPDATE_ACTIVE_STATUS:
        draft.updateStatus.loading = false;
        draft.updateStatus.success = false;
        draft.updateStatus.error = action.payload.Error;
        draft.showUpdateStatusSuccess = action.payload.success;
        draft.showUpdateStatusMessage = action.payload.Error;
        break;
      case CLEAR_UPDATE_STATUS:
        draft.updateStatus.success = false;
        draft.updateStatus.message = '';
        break;
      case CLEAR_MESSAGE:
        draft.showUpdateStatusSuccess = false;
        draft.showUpdateStatusMessage = '';
    }
  });

export default spaceReducer;
