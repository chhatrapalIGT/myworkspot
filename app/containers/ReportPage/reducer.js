/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  REQUEST_GET_LOCATION,
  SUCCESS_GET_LOCATION,
  FAILED_GET_LOCATION,
} from './constants';

const initialState = {
  getLocationData: {
    success: false,
    message: '',
    locationList: {},
  },
};

const reportReducer = (state = initialState, action) =>
  produce(state, draft => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case REQUEST_GET_LOCATION:
        draft.getLocationData.success = false;
        draft.getLocationData.message = '';
        draft.getLocationData.locationList = {};
        break;
      case SUCCESS_GET_LOCATION:
        draft.getLocationData.success = true;
        draft.getLocationData.message = action.payload.message;
        draft.getLocationData.locationList = action.payload.locationdata;
        break;
      case FAILED_GET_LOCATION:
        draft.getLocationData.success = false;
        draft.getLocationData.message = action.payload.message;
        draft.getLocationData.locationList = action.payload.locationdata;
        break;
    }
  });
export default reportReducer;
