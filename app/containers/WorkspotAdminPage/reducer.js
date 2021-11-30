/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  REQUEST_LOCATION_CAPACITY,
  SUCCESS_LOCATION_CAPACITY,
  FAILED_LOCATION_CAPACITY,
} from './constants';

const initialState = {
  getLocationCapacity: {
    capacity: [],
    success: false,
    message: '',
    loading: false,
  },
  apiSuccess: false,
  apiMessage: '',
};

const workspotAdminReducer = (state = initialState, action) =>
  produce(state, draft => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case REQUEST_LOCATION_CAPACITY:
        draft.getLocationCapacity.success = false;
        draft.getLocationCapacity.loading = true;
        draft.getLocationCapacity.message = '';
        draft.getLocationCapacity.capacity = {};
        break;
      case SUCCESS_LOCATION_CAPACITY:
        draft.getLocationCapacity.success = true;
        draft.getLocationCapacity.loading = false;
        draft.getLocationCapacity.message = action.payload.message;
        draft.getLocationCapacity.capacity = action.payload.returndata;

        break;
      case FAILED_LOCATION_CAPACITY:
        draft.getLocationCapacity.success = false;
        draft.getLocationCapacity.loading = false;
        draft.getLocationCapacity.message = action.payload.message;
        draft.getLocationCapacity.capacity = {};
        draft.apiSuccess = action.payload.success;
        draft.apiMessage = action.payload.message;
        break;
    }
  });
export default workspotAdminReducer;
