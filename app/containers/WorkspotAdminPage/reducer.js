/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  REQUEST_LOCATION_CAPACITY,
  SUCCESS_LOCATION_CAPACITY,
  FAILED_LOCATION_CAPACITY,
  RESET_WORKSPOT_ADMIN_MESSAGE,
  REQUEST_CAPACITY_WARNING,
  SUCCESS_CAPACITY_WARNING,
  FAILED_CAPACITY_WARNING,
} from './constants';

const initialState = {
  getLocationCapacity: {
    capacity: [],
    success: false,
    message: '',
    loading: false,
  },
  getCapacityWarning: {
    getWarning: [],
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

      case REQUEST_CAPACITY_WARNING:
        draft.getCapacityWarning.success = false;
        draft.getCapacityWarning.loading = true;
        draft.getCapacityWarning.message = '';
        draft.getCapacityWarning.getWarning = {};
        break;
      case SUCCESS_CAPACITY_WARNING:
        draft.getCapacityWarning.success = true;
        draft.getCapacityWarning.loading = false;
        draft.getCapacityWarning.message = action.payload.message;
        draft.getCapacityWarning.getWarning = action.payload.data;

        break;
      case FAILED_CAPACITY_WARNING:
        draft.getCapacityWarning.success = false;
        draft.getCapacityWarning.loading = false;
        draft.getCapacityWarning.message = action.payload.message;
        draft.getCapacityWarning.getWarning = {};
        draft.apiSuccess = action.payload.success;
        draft.apiMessage = action.payload.message;
        break;

      case RESET_WORKSPOT_ADMIN_MESSAGE:
        draft.apiMessage = '';
        draft.apiSuccess = false;
        break;
    }
  });
export default workspotAdminReducer;
