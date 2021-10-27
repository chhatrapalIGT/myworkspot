/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  REQUEST_GET_TEAM_MEMBER,
  SUCCESS_GET_TEAM_MEMBER,
  FAILED_GET_TEAM_MEMBER,
  REQUEST_ADD_TEAM_MEMBER,
  SUCCESS_ADD_TEAM_MEMBER,
  FAILED_ADD_TEAM_MEMBER,
  CLEAR_ADD_TEAM_DATA,
} from './constants';

const initialState = {
  allTeamMemberList: {
    error: '',
    success: false,
    loading: false,
    message: '',
    member: [],
  },
  updateMember: {
    error: '',
    success: false,
    loading: false,
    message: '',
  },
  reportApiSuccess: false,
  reportApiMessage: '',
};

const reportReducer = (state = initialState, action) =>
  produce(state, draft => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case REQUEST_GET_TEAM_MEMBER:
        draft.allTeamMemberList.loading = true;
        draft.allTeamMemberList.error = '';
        break;
      case SUCCESS_GET_TEAM_MEMBER:
        draft.allTeamMemberList.loading = false;
        draft.allTeamMemberList.success = true;
        draft.allTeamMemberList.member = action.payload;
        draft.allTeamMemberList.error = '';
        break;
      case FAILED_GET_TEAM_MEMBER:
        draft.allTeamMemberList.loading = false;
        draft.allTeamMemberList.success = false;
        draft.allTeamMemberList.member = [];
        draft.allTeamMemberList.error = action.payload;
        draft.reportApiMessage = action.payload.message;
        draft.reportApiSuccess = action.payload.success;
        break;

      case REQUEST_ADD_TEAM_MEMBER:
        draft.updateMember.loading = true;
        draft.updateMember.error = '';
        draft.updateMember.success = false;
        break;
      case SUCCESS_ADD_TEAM_MEMBER:
        draft.updateMember.loading = false;
        draft.updateMember.success = action.payload.success;
        draft.updateMember.message = action.payload.message;

        break;
      case FAILED_ADD_TEAM_MEMBER:
        draft.updateMember.loading = false;
        draft.updateMember.success = action.payload.success;
        draft.updateMember.message = action.payload.message;

        break;
      case CLEAR_ADD_TEAM_DATA:
        draft.reportApiMessage = '';
        draft.reportApiSuccess = false;
        draft.updateMember.success = false;
        break;
    }
  });
export default reportReducer;
