/**
 * Gets the repositories of the user from Github
 */

import { put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import {
  REQUEST_GET_LOCATION,
  REQUEST_GET_WEEKLY_DEFAULT,
  REQUEST_UPDATE_WORKSPOT,
  REQUEST_GET_NEIGHBORHOOD,
  REQUEST_GET_COLLEAGUE,
  REQUEST_VIEW_COLLEAGUE_DATA,
  REQUEST_SEARCH_COLLEAGUE_DATA,
  REQUEST_DELETE_COLLEAGUE_DATA,
} from './constants';

import {
  getLocationSuccess,
  getLocationFailed,
  getWeeklyDefaultSuccess,
  getWeeklyDefaultFailed,
  updateWorkspotSuccess,
  updateWorkspotFailed,
  getNeighborhoodSuccess,
  getNeighborhoodFailed,
  getColleagueSuccess,
  getColleagueFailed,
  getColleagueDataSuccess,
  getColleagueDataFailed,
  searchColleagueDataSuccess,
  searchColleagueDataFailed,
  DeleteColleagueDataSuccess,
  DeleteColleagueDataFailed,
} from './actions';
// eslint-disable-next-line import/named
import { CONSTANT } from '../../enum';

const { API_URL } = CONSTANT;

export function* getLocation() {
  const requestURL = `${API_URL}/location/GetData`;
  try {
    const locationList = yield request({
      method: 'GET',
      url: requestURL,
    });
    const { data } = locationList;
    if (data && data.success) {
      yield put(getLocationSuccess(data));
    } else {
      yield put(getLocationFailed(data));
    }
  } catch (err) {
    yield put(getLocationFailed(err));
  }
}

export function* getWeeklyData() {
  const requestURL = `${API_URL}/weaklyDefault/getData?groupBy=week`;
  try {
    const weeklyList = yield request({
      method: 'GET',
      url: requestURL,
    });
    const { data } = weeklyList;
    if (data && data.success) {
      yield put(getWeeklyDefaultSuccess(data));
    } else {
      yield put(getWeeklyDefaultFailed(data));
    }
  } catch (err) {
    yield put(getWeeklyDefaultFailed(err));
  }
}

export function* updateWorkspot({ payload }) {
  const requestURL = `${API_URL}/workspot/editWorkSpot?employeeid=239323`;
  try {
    const updateData = yield request({
      method: 'PUT',
      url: requestURL,
      data: payload,
    });
    const { data } = updateData;
    if (data && data.success) {
      yield put(updateWorkspotSuccess(data));
    } else {
      yield put(updateWorkspotFailed(data));
    }
  } catch (err) {
    yield put(updateWorkspotFailed(err));
  }
}

export function* getNeighborhood() {
  const requestURL = `${API_URL}/neighborhoods/getneighborhood?employeeid=239323`;
  try {
    const neighborhhod = yield request({
      method: 'GET',
      url: requestURL,
    });
    const { data } = neighborhhod;
    if (data && data.success) {
      yield put(getNeighborhoodSuccess(data));
    } else {
      yield put(getNeighborhoodFailed(data));
    }
  } catch (err) {
    yield put(getNeighborhoodFailed(err));
  }
}

export function* getColleague() {
  const requestURL = `${API_URL}/Delegate/getUsersForDelegate?employeeid=239323`;
  try {
    const colleagues = yield request({
      method: 'GET',
      url: requestURL,
    });
    const { data } = colleagues;
    if (data && data.success) {
      yield put(getColleagueSuccess(data));
    } else {
      yield put(getColleagueFailed(data));
    }
  } catch (err) {
    yield put(getColleagueFailed(err));
  }
}

export function* getColleagueData({ payload }) {
  const requestURL = `${API_URL}/Colleagues/getColleaguesWorkspotdata?employeeid=239323&startdate=${
    payload.startdate
  }&enddate=${payload.enddate}`;
  try {
    const colleagueData = yield request({
      method: 'GET',
      url: requestURL,
      data: payload,
    });
    const { data } = colleagueData;
    if (data && data.success) {
      yield put(getColleagueDataSuccess(data));
    } else {
      yield put(getColleagueDataFailed(data));
    }
  } catch (err) {
    yield put(getColleagueDataFailed(err));
  }
}

export function* searchColleagueData({ payload }) {
  const requestURL = `${API_URL}/Colleagues/saveColleaguesdata`;
  try {
    const searchColleague = yield request({
      method: 'POST',
      url: requestURL,
      data: payload,
    });
    const { data } = searchColleague;
    if (data && data.success) {
      yield put(searchColleagueDataSuccess(data));
    } else {
      yield put(searchColleagueDataFailed(data));
    }
  } catch (err) {
    yield put(searchColleagueDataFailed(err));
  }
}

export function* deleteSearchColleagueData({ payload }) {
  console.log(`payload`, payload);
  const requestURL = `${API_URL}/Colleagues/deleteColleaguesUser?employeeid=239323&colleaguesid=${
    payload.colleaguesid
  }`;
  try {
    const searchColleague = yield request({
      method: 'DELETE',
      url: requestURL,
      data: payload,
    });
    const { data } = searchColleague;
    if (data && data.success) {
      yield put(DeleteColleagueDataSuccess(data));
    } else {
      yield put(DeleteColleagueDataFailed(data));
    }
  } catch (err) {
    yield put(DeleteColleagueDataFailed(err));
  }
}

export default function* workSpotSaga() {
  yield takeLatest(REQUEST_GET_LOCATION, getLocation);
  yield takeLatest(REQUEST_UPDATE_WORKSPOT, updateWorkspot);
  yield takeLatest(REQUEST_GET_WEEKLY_DEFAULT, getWeeklyData);
  yield takeLatest(REQUEST_GET_NEIGHBORHOOD, getNeighborhood);
  yield takeLatest(REQUEST_GET_COLLEAGUE, getColleague);
  yield takeLatest(REQUEST_VIEW_COLLEAGUE_DATA, getColleagueData);
  yield takeLatest(REQUEST_SEARCH_COLLEAGUE_DATA, searchColleagueData);
  yield takeLatest(REQUEST_DELETE_COLLEAGUE_DATA, deleteSearchColleagueData);
}
