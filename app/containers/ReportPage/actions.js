import {
  REQUEST_GET_TEAM_MEMBER,
  SUCCESS_GET_TEAM_MEMBER,
  FAILED_GET_TEAM_MEMBER,
  REQUEST_ADD_TEAM_MEMBER,
  SUCCESS_ADD_TEAM_MEMBER,
  FAILED_ADD_TEAM_MEMBER,
} from './constants';

export const requestGetTeamMember = payload => ({
  type: REQUEST_GET_TEAM_MEMBER,
  payload,
});

export const getTeamMemberSuccess = payload => ({
  type: SUCCESS_GET_TEAM_MEMBER,
  payload,
});

export const getTeamMemberFailed = error => ({
  type: FAILED_GET_TEAM_MEMBER,
  payload: error,
});

export const requestAddTeamMember = payload => ({
  type: REQUEST_ADD_TEAM_MEMBER,
  payload,
});

export const addTeamMemberSuccess = payload => ({
  type: SUCCESS_ADD_TEAM_MEMBER,
  payload,
});

export const addTeamMemberFailed = error => ({
  type: FAILED_ADD_TEAM_MEMBER,
  payload: error,
});
