/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  REQUEST_GET_LOCATION,
  SUCCESS_GET_LOCATION,
  FAILED_GET_LOCATION,
  REQUEST_GET_WEEKLY_DEFAULT,
  SUCCESS_GET_WEEKLY_DEFAULT,
  FAILED_GET_WEEKLY_DEFAULT,
} from './constants';

const initialState = {
  getLocationData: {
    success: false,
    message: '',
    locationList: {},
  },
  getWeeklyDefaultData: {
    success: false,
    message: '',
    weeklyData: {},
  },
};

const workspotReducer = (state = initialState, action) =>
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
        // draft.getLocationData.message = action.payload.message;
        draft.getLocationData.locationList = action.payload.data;
        break;
      case FAILED_GET_LOCATION:
        draft.getLocationData.success = false;
        draft.getLocationData.message = action.payload.message;
        draft.getLocationData.locationList = {};
        break;
      case REQUEST_GET_WEEKLY_DEFAULT:
        draft.getWeeklyDefaultData.success = false;
        draft.getWeeklyDefaultData.message = '';
        draft.getWeeklyDefaultData.weeklyData = {};
        break;
      case SUCCESS_GET_WEEKLY_DEFAULT:
        draft.getWeeklyDefaultData.success = true;
        // draft.getWeeklyDefaultData.message = action.payload.message;
        draft.getWeeklyDefaultData.weeklyData = action.payload.deptData;
        break;
      case FAILED_GET_WEEKLY_DEFAULT:
        draft.getWeeklyDefaultData.success = false;
        draft.getWeeklyDefaultData.message = action.payload.message;
        draft.getWeeklyDefaultData.weeklyData = {};
        break;
    }
  });
export default workspotReducer;
