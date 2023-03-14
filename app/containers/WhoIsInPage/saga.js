import { put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'react-router-redux';
import { get } from 'lodash';
import moment from 'moment';
import {
  REQUEST_GET_WHOISIN_DETAIL,
  REQUEST_GET_OFFICE_FLOOR,
  REQUEST_GET_OFFICE_NEIGHBORHOOD,
} from './constants';
import {
  getWhoIsInDetailSuccess,
  getWhoIsInDetailFailed,
  getOfficeFloorSuccess,
  getOfficeFloorFailed,
  getOfficeNeighborhoodSuccess,
  getOfficeNeighborhoodFailed,
} from './action';
import { CONSTANT } from '../../enum';
const { API_URL } = CONSTANT;

export function* getWhosIn({ payload }) {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  const limit = get(payload, 'limit', 10);
  const page = get(payload, 'page', 1);
  const pay = {
    searchFilter: payload.searchKeyword,
    sortBy: payload.sortBy,
    limit,
    page,
    locationFilter: payload.office,
    floorFilter: payload.floor,
    buildingFilter: payload.building,
    neighborhoodnameFilter: payload.neighborhood,
    todayDate: moment().format('YYYY-MM-DD'),
    // todayDate: '2023-03-09',
  };
  const requestURL = `${API_URL}/whosIn/getWhosIn`;
  try {
    const whosInList = yield request({
      method: 'POST',
      url: requestURL,
      data: pay,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = whosInList;
    if (data.status === 403) {
      sessionStorage.clear();
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(getWhoIsInDetailSuccess(data || []));
    } else {
      yield put(getWhoIsInDetailFailed(data));
    }
  } catch (err) {
    yield put(getWhoIsInDetailFailed('Please try again'));
  }
}

export function* getOfficeFloor({ payload }) {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  const requestURL = `${API_URL}/Building/getFloorByName`;
  try {
    const floorList = yield request({
      method: 'POST',
      url: requestURL,
      data: payload,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = floorList;
    if (data.status === 403) {
      sessionStorage.clear();
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(getOfficeFloorSuccess(data || []));
    } else {
      yield put(getOfficeFloorFailed(data));
    }
  } catch (err) {
    yield put(getOfficeFloorFailed('Please try again'));
  }
}

export function* getOfficeNeighbourhood({ payload }) {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  const requestURL = `${API_URL}/neighborhoods/getNeighborhoodName`;
  try {
    const neighborhoodList = yield request({
      method: 'POST',
      url: requestURL,
      data: payload,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = neighborhoodList;
    if (data.status === 403) {
      sessionStorage.clear();
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(getOfficeNeighborhoodSuccess(data || []));
    } else {
      yield put(getOfficeNeighborhoodFailed(data));
    }
  } catch (err) {
    yield put(getOfficeNeighborhoodFailed('Please try again'));
  }
}

export default function* assignmentSaga() {
  yield takeLatest(REQUEST_GET_WHOISIN_DETAIL, getWhosIn);
  yield takeLatest(REQUEST_GET_OFFICE_FLOOR, getOfficeFloor);
  yield takeLatest(REQUEST_GET_OFFICE_NEIGHBORHOOD, getOfficeNeighbourhood);
}
