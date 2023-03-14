import produce from 'immer';

import {
  CLEAR_OFFICE,
  FAILED_GET_WHOISIN_DETAIL,
  FAILED_GET_OFFICE_FLOOR,
  FAILED_GET_OFFICE_NEIGHBORHOOD,
  REQUEST_GET_WHOISIN_DETAIL,
  REQUEST_GET_OFFICE_FLOOR,
  REQUEST_GET_OFFICE_NEIGHBORHOOD,
  SUCCESS_GET_WHOISIN_DETAIL,
  SUCCESS_GET_OFFICE_FLOOR,
  SUCCESS_GET_OFFICE_NEIGHBORHOOD,
} from './constants';

// The initial state of the App
const initialState = {
  whoIsInDetail: {
    error: '',
    success: false,
    message: '',
    loading: false,
    whoIsIn: [],
  },
  officeFloor: {
    error: '',
    success: false,
    message: '',
    loading: false,
    floors: [],
  },
  officeNeighborhood: {
    error: '',
    success: false,
    message: '',
    loading: false,
    neighborhood: [],
  },
  apiMessage: '',
  apiSuccess: false,
};

/* eslint-disable default-case, no-param-reassign */
const WhoIsInReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REQUEST_GET_WHOISIN_DETAIL:
        draft.whoIsInDetail.loading = true;
        draft.whoIsInDetail.error = '';
        break;
      case SUCCESS_GET_WHOISIN_DETAIL:
        draft.whoIsInDetail.loading = false;
        draft.whoIsInDetail.success = true;
        draft.whoIsInDetail.whoIsIn = action.payload;
        draft.whoIsInDetail.error = '';
        break;
      case FAILED_GET_WHOISIN_DETAIL:
        draft.whoIsInDetail.loading = false;
        draft.whoIsInDetail.success = action.payload.success;
        draft.whoIsInDetail.message = action.payload;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;
      case REQUEST_GET_OFFICE_FLOOR:
        draft.officeFloor.loading = true;
        draft.officeFloor.error = '';
        break;
      case SUCCESS_GET_OFFICE_FLOOR:
        draft.officeFloor.loading = false;
        draft.officeFloor.success = true;
        draft.officeFloor.floors = action.payload.data;
        draft.officeFloor.error = '';
        break;
      case FAILED_GET_OFFICE_FLOOR:
        draft.officeFloor.loading = false;
        // draft.officeFloor.floors = [];
        draft.officeFloor.success = action.payload.success;
        draft.officeFloor.message = action.payload;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;
      case REQUEST_GET_OFFICE_NEIGHBORHOOD:
        draft.officeNeighborhood.loading = true;
        draft.officeNeighborhood.error = '';
        break;
      case SUCCESS_GET_OFFICE_NEIGHBORHOOD:
        draft.officeNeighborhood.loading = false;
        draft.officeNeighborhood.success = true;
        draft.officeNeighborhood.neighborhood = action.payload.data;
        draft.officeNeighborhood.error = '';
        break;
      case FAILED_GET_OFFICE_NEIGHBORHOOD:
        draft.officeNeighborhood.loading = false;
        draft.officeNeighborhood.success = action.payload.success;
        draft.officeNeighborhood.message = action.payload;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;
      case CLEAR_OFFICE:
        draft.getOfficeData.error = '';
        draft.getOfficeData.success = false;
    }
  });
export default WhoIsInReducer;
