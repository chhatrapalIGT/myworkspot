/* eslint-disable no-param-reassign */
import { produce } from 'immer';
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
  REQUEST_GET_COLLEAGUE,
  SUCCESS_GET_COLLEAGUE,
  FAILED_GET_COLLEAGUE,
  REQUEST_VIEW_COLLEAGUE_DATA,
  SUCCESS_VIEW_COLLEAGUE_DATA,
  FAILED_VIEW_COLLEAGUE_DATA,
  REQUEST_SEARCH_COLLEAGUE_DATA,
  SUCCESS_SEARCH_COLLEAGUE_DATA,
  FAILED_SEARCH_COLLEAGUE_DATA,
  REQUEST_DELETE_COLLEAGUE_DATA,
  SUCCESS_DELETE_COLLEAGUE_DATA,
  FAILED_DELETE_COLLEAGUE_DATA,
  RESET_WORKSPOT_MESSAGE,
  REQUEST_GET_MONTH_DATA,
  SUCCESS_GET_MONTH_DATA,
  FAILED_GET_MONTH_DATA,
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
    updateData: [],
  },

  neighborhood: {
    message: '',
    success: false,
    neighborhoodData: {},
    isloading: false,
  },

  colleagueData: {
    message: '',
    success: false,
    colleagueList: [],
    isloading: false,
  },

  getColleagueData: {
    message: '',
    success: false,
    colleagueData: [],
    isloading: false,
  },

  searchColleague: {
    message: '',
    success: false,
    isloading: false,
  },

  deleteSearchColleague: {
    message: '',
    success: false,
    isloading: false,
  },

  getMonthData: {
    success: false,
    loading: false,
    message: '',
    monthData: [],
  },
  apiSuccess: false,
  apiMessage: '',
};

const workspotReducer = (state = initialState, action) =>
  produce(state, (draft) => {
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
        draft.getLocationData.locationList = action.payload.data;

        break;
      case FAILED_GET_LOCATION:
        draft.getLocationData.success = false;
        draft.getLocationData.message = action.payload.message;
        draft.getLocationData.locationList = {};
        draft.apiSuccess = action.payload.success;
        draft.apiMessage = action.payload.message;
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
        draft.apiSuccess = action.payload.success;
        draft.apiMessage = action.payload.message;
        break;
      case REQUEST_UPDATE_WORKSPOT:
        draft.updateWorkspot.success = false;
        draft.updateWorkspot.isLoading = true;
        draft.updateWorkspot.message = '';
        draft.updateWorkspot.updateData = {};
        break;
      case SUCCESS_UPDATE_WORKSPOT:
        draft.updateWorkspot.success = true;
        draft.updateWorkspot.isLoading = false;
        draft.updateWorkspot.message = action.payload.message;
        draft.updateWorkspot.updateData = action.payload.deptData;
        draft.apiSuccess = action.payload.success;
        draft.apiMessage = action.payload.message;
        break;
      case FAILED_UPDATE_WORKSPOT:
        draft.updateWorkspot.success = false;
        draft.updateWorkspot.isLoading = false;
        draft.updateWorkspot.message = action.payload.message;
        draft.updateWorkspot.updateData = {};
        draft.apiSuccess = action.payload.success;
        draft.apiMessage = action.payload.message;
        break;
      case RESET_WORKSPOT:
        draft.updateWorkspot.updateData = {};
        draft.updateWorkspot.success = false;
        draft.updateWorkspot.isLoading = false;
        draft.updateWorkspot.message = '';
        draft.searchColleague.success = false;
        draft.searchColleague.message = '';
        draft.deleteSearchColleague.success = false;
        draft.deleteSearchColleague.message = '';
        draft.getColleagueData.success = false;

        break;

      case REQUEST_GET_NEIGHBORHOOD:
        draft.neighborhood.success = false;
        draft.neighborhood.isloading = true;
        draft.neighborhood.message = '';
        // draft.neighborhood.neighborhoodData = {};
        break;
      case SUCCESS_GET_NEIGHBORHOOD:
        draft.neighborhood.isloading = false;
        draft.neighborhood.success = true;
        draft.neighborhood.message = action.payload.message;
        draft.neighborhood.neighborhoodData = action.payload.locationdata;

        break;
      case FAILED_GET_NEIGHBORHOOD:
        draft.neighborhood.isloading = false;
        draft.neighborhood.success = false;
        draft.neighborhood.message = action.payload.message;
        draft.neighborhood.neighborhoodData = {};
        draft.apiSuccess = action.payload.success;
        draft.apiMessage = action.payload.message;
        break;

      case REQUEST_GET_COLLEAGUE:
        draft.colleagueData.success = false;
        draft.colleagueData.isloading = true;

        break;
      case SUCCESS_GET_COLLEAGUE:
        draft.colleagueData.isloading = false;
        draft.colleagueData.success = true;
        draft.colleagueData.message = action.payload.message;
        draft.colleagueData.colleagueList = action.payload.userData;

        break;
      case FAILED_GET_COLLEAGUE:
        draft.colleagueData.isloading = false;
        draft.colleagueData.success = false;
        draft.colleagueData.message = action.payload.message;
        draft.colleagueData.colleagueDataData = {};
        draft.apiSuccess = action.payload.success;
        draft.apiMessage = action.payload.message;
        break;

      case REQUEST_VIEW_COLLEAGUE_DATA:
        draft.getColleagueData.success = false;
        draft.getColleagueData.isloading = true;
        draft.getColleagueData.message = '';

        break;
      case SUCCESS_VIEW_COLLEAGUE_DATA:
        draft.getColleagueData.isloading = false;
        draft.getColleagueData.success = true;
        draft.getColleagueData.message = action.payload.message;
        draft.getColleagueData.colleagueData = action.payload.returnData;
        break;
      case FAILED_VIEW_COLLEAGUE_DATA:
        draft.getColleagueData.isloading = false;
        draft.getColleagueData.success = false;
        draft.getColleagueData.message = action.payload.message;
        draft.getColleagueData.colleagueData = {};

        break;

      case REQUEST_SEARCH_COLLEAGUE_DATA:
        draft.searchColleague.success = false;
        draft.searchColleague.isloading = true;
        draft.searchColleague.message = '';
        break;
      case SUCCESS_SEARCH_COLLEAGUE_DATA:
        draft.searchColleague.isloading = false;
        draft.searchColleague.success = true;
        draft.searchColleague.message = action.payload.message;

        break;
      case FAILED_SEARCH_COLLEAGUE_DATA:
        draft.searchColleague.isloading = false;
        draft.searchColleague.success = false;
        draft.searchColleague.message = action.payload.message;

        break;

      case REQUEST_DELETE_COLLEAGUE_DATA:
        draft.deleteSearchColleague.success = false;
        draft.deleteSearchColleague.isloading = true;

        break;
      case SUCCESS_DELETE_COLLEAGUE_DATA:
        draft.deleteSearchColleague.isloading = false;
        draft.deleteSearchColleague.success = true;
        draft.deleteSearchColleague.message = action.payload.message;

        break;
      case FAILED_DELETE_COLLEAGUE_DATA:
        draft.deleteSearchColleague.isloading = false;
        draft.deleteSearchColleague.success = false;
        draft.deleteSearchColleague.message = action.payload.message;

        break;

      case REQUEST_GET_MONTH_DATA:
        draft.getMonthData.success = false;
        draft.getMonthData.isloading = true;
        // draft.getMonthData.message = '';
        // draft.getMonthData.colleagueData = {};
        break;
      case SUCCESS_GET_MONTH_DATA:
        draft.getMonthData.isloading = false;
        draft.getMonthData.success = true;
        draft.getMonthData.message = action.payload.message;
        draft.getMonthData.monthData = action.payload.response;
        draft.apiSuccess = action.payload.success;
        draft.apiMessage = action.payload.message;
        break;
      case FAILED_GET_MONTH_DATA:
        draft.getMonthData.isloading = false;
        draft.getMonthData.success = false;
        draft.getMonthData.message = action.payload.message;
        // draft.getMonthData.colleagueData = {};
        draft.apiSuccess = false;
        draft.apiMessage = action.payload.message;
        break;

      case RESET_WORKSPOT_MESSAGE:
        draft.apiMessage = '';
        draft.apiSuccess = false;
        break;
    }
  });
export default workspotReducer;
