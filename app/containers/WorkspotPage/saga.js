/**
 * Gets the repositories of the user from Github
 */

import { put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import moment from 'moment';
import { push } from 'react-router-redux';
import {
  REQUEST_GET_LOCATION,
  REQUEST_GET_WEEKLY_DEFAULT,
  REQUEST_UPDATE_WORKSPOT,
  REQUEST_GET_NEIGHBORHOOD,
  REQUEST_GET_COLLEAGUE,
  REQUEST_VIEW_COLLEAGUE_DATA,
  REQUEST_SEARCH_COLLEAGUE_DATA,
  REQUEST_DELETE_COLLEAGUE_DATA,
  REQUEST_GET_MONTH_DATA,
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
  getMonthDataSuccess,
  getMonthDataFailed,
} from './actions';
// eslint-disable-next-line import/named
import { CONSTANT } from '../../enum';

const { API_URL } = CONSTANT;

export function* getLocation() {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  const requestURL = `${API_URL}/location/GetData`;
  try {
    const locationList = yield request({
      method: 'GET',
      url: requestURL,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = locationList;
    if (locationList.status === 403) {
      sessionStorage.clear();

      // window.location.push('/auth');
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(getLocationSuccess(data));
    } else {
      yield put(getLocationFailed(data));
    }
  } catch (err) {
    yield put(getLocationFailed(err));
  }
}

export function* getWeeklyData() {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  const requestURL = `${API_URL}/weaklyDefault/getData?groupBy=week`;
  try {
    const weeklyList = yield request({
      method: 'GET',
      url: requestURL,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = weeklyList;
    if (weeklyList.status === 403) {
      sessionStorage.clear();

      // window.location.push('/auth');
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(getWeeklyDefaultSuccess(data));
    } else {
      yield put(getWeeklyDefaultFailed(data));
    }
  } catch (err) {
    yield put(getWeeklyDefaultFailed(err));
  }
}

export function* updateWorkspot({ payload }) {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  const requestURL = `${API_URL}/workspot/editWorkSpot`;
  try {
    const updateData = yield request({
      method: 'PUT',
      url: requestURL,
      data: payload,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = updateData;
    if (updateData.status === 403) {
      sessionStorage.clear();

      // window.location.push('/auth');
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(updateWorkspotSuccess(data));
    } else {
      yield put(updateWorkspotFailed(data));
    }
  } catch (err) {
    yield put(updateWorkspotFailed(err));
  }
}

export function* getNeighborhood() {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  const date = moment().format('YYYY-MM-DD');
  const requestURL = `${API_URL}/neighborhoods/getneighborhood?todayDate=${date}`;
  try {
    const neighborhhod = yield request({
      method: 'GET',
      url: requestURL,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = neighborhhod;
    if (neighborhhod.status === 403) {
      sessionStorage.clear();

      // window.location.push('/auth');
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(getNeighborhoodSuccess(data));
    } else {
      yield put(getNeighborhoodFailed(data));
    }
  } catch (err) {
    yield put(getNeighborhoodFailed(err));
  }
}

export function* getColleague() {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  const requestURL = `${API_URL}/Delegate/getUsersForDelegate`;
  try {
    const colleagues = yield request({
      method: 'GET',
      url: requestURL,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = colleagues;
    if (colleagues.status === 403) {
      sessionStorage.clear();

      // window.location.push('/auth');
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(getColleagueSuccess(data));
    } else {
      yield put(getColleagueFailed(data));
    }
  } catch (err) {
    yield put(getColleagueFailed(err));
  }
}

export function* getColleagueData({ payload }) {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  const requestURL = `${API_URL}/Colleagues/getColleaguesWorkspotdata?startdate=${
    payload.startdate
  }&enddate=${payload.enddate}`;
  try {
    const colleagueData = yield request({
      method: 'GET',
      url: requestURL,
      data: payload,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = colleagueData;
    if (colleagueData.status === 403) {
      sessionStorage.clear();

      // window.location.push('/auth');
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(getColleagueDataSuccess(data));
    } else {
      yield put(getColleagueDataFailed(data));
    }
  } catch (err) {
    yield put(getColleagueDataFailed(err));
  }
}

export function* searchColleagueData({ payload }) {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  const requestURL = `${API_URL}/Colleagues/saveColleaguesdata`;
  try {
    const searchColleague = yield request({
      method: 'POST',
      url: requestURL,
      data: payload,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = searchColleague;
    if (searchColleague.status === 403) {
      sessionStorage.clear();

      // window.location.push('/auth');
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(searchColleagueDataSuccess(data));
    } else {
      yield put(searchColleagueDataFailed(data));
    }
  } catch (err) {
    yield put(searchColleagueDataFailed(err));
  }
}

export function* deleteSearchColleagueData({ payload }) {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  const requestURL = `${API_URL}/Colleagues/deleteColleaguesUser?colleaguesid=${
    payload.colleaguesid
  }`;
  try {
    const searchColleague = yield request({
      method: 'DELETE',
      url: requestURL,
      data: payload,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = searchColleague;
    if (searchColleague.status === 403) {
      sessionStorage.clear();

      // window.location.push('/auth');
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(DeleteColleagueDataSuccess(data));
    } else {
      yield put(DeleteColleagueDataFailed(data));
    }
  } catch (err) {
    yield put(DeleteColleagueDataFailed(err));
  }
}

export function* getMonthData() {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  const requestURL = `${API_URL}/workspot/GetMonthSignForWorkspot`;
  try {
    const monthData = yield request({
      method: 'GET',
      url: requestURL,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = monthData;
    if (monthData.status === 403) {
      sessionStorage.clear();

      // window.location.push('/auth');
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(getMonthDataSuccess(data));
    } else {
      yield put(getMonthDataFailed(data));
    }
  } catch (err) {
    yield put(getMonthDataFailed(err));
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
  yield takeLatest(REQUEST_GET_MONTH_DATA, getMonthData);
}
