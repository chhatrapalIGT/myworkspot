/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  REQUEST_GET_LOCATION,
  SUCCESS_GET_LOCATION,
  FAILED_GET_LOCATION,
  REQUEST_GET_WEEKLY_DEFAULT,
  SUCCESS_GET_WEEKLY_DEFAULT,
  FAILED_GET_WEEKLY_DEFAULT,
  REQUEST_UPDATE_WORKSPOT,
  SUCCESS_UPDATE_WORKSPOT,
  FAILED_UPDATE_WORKSPOT,
  RESET_WORKSPOT,
  REQUEST_GET_NEIGHBORHOOD,
  SUCCESS_GET_NEIGHBORHOOD,
  FAILED_GET_NEIGHBORHOOD,
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

  updateWorkspot: {
    message: '',
    success: false,
    isLoading: false,
  },

  neighborhood: {
    message: '',
    success: false,
    neighborhoodData: [],
    isloading: false,
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
        draft.getLocationData.success = action.payload.success;
        draft.getLocationData.message = action.payload.message;
        draft.getLocationData.locationList = action.payload.data;
        break;
      case FAILED_GET_LOCATION:
        draft.getLocationData.success = action.payload.success;
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
      case REQUEST_UPDATE_WORKSPOT:
        draft.updateWorkspot.success = false;
        draft.updateWorkspot.isLoading = true;
        draft.updateWorkspot.message = '';
        draft.updateWorkspot.updateData = {};
        break;
      case SUCCESS_UPDATE_WORKSPOT:
        draft.updateWorkspot.success = action.payload.success;
        draft.updateWorkspot.isLoading = false;
        draft.updateWorkspot.message = action.payload.message;
        draft.updateWorkspot.updateData = action.payload.deptData;
        break;
      case FAILED_UPDATE_WORKSPOT:
        draft.updateWorkspot.success = action.payload.success;
        draft.updateWorkspot.isLoading = false;
        draft.updateWorkspot.message = action.payload.message;
        draft.updateWorkspot.updateData = {};
        break;
      case RESET_WORKSPOT:
        draft.updateWorkspot.success = false;
        draft.updateWorkspot.isLoading = false;
        draft.updateWorkspot.message = '';
        draft.locationdata.success = false;
        draft.locationdata.message = '';
        draft.neighborhood.success = false;
        draft.neighborhood.message = '';
        break;

      case REQUEST_GET_NEIGHBORHOOD:
        draft.neighborhood.success = false;
        draft.neighborhood.message = '';
        draft.neighborhood.neighborhoodData = {};
        break;
      case SUCCESS_GET_NEIGHBORHOOD:
        draft.neighborhood.success = true;
        draft.neighborhood.message = action.payload.message;
        draft.neighborhood.neighborhoodData = action.payload.locationdata;
        break;
      case FAILED_GET_NEIGHBORHOOD:
        draft.neighborhood.success = false;
        draft.neighborhood.message = action.payload.message;
        draft.neighborhood.neighborhoodData = {};
        break;
    }
  });
export default workspotReducer;
