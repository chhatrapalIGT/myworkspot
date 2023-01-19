import { put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'react-router-redux';
import { get } from 'lodash';
import moment from 'moment';
import {
  REQUEST_GET_ASSIGNMENT_DETAIL,
  REQUEST_GET_EXPORT_DATA,
  REQUEST_GET_OFFICE_FLOOR,
  REQUEST_GET_OFFICE_NEIGHBORHOOD,
} from './constants';
import {
  getAssignmentDetailSuccess,
  getAssignmentDetailFailed,
  getExportDataSuccess,
  getExportDataFailed,
  getOfficeFloorSuccess,
  getOfficeFloorFailed,
  getOfficeNeighborhoodSuccess,
  getOfficeNeighborhoodFailed,
} from './action';
import { CONSTANT } from '../../enum';
const { API_URL } = CONSTANT;

export function* getAssignmentData({ payload }) {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  const limit = get(payload, 'limit', 10);
  const page = get(payload, 'page', 1);
  const pay = {
    searchKeyword: payload.searchKeyword,
    sortBy: payload.sortBy,
    limit,
    page,
    office: payload.office,
    floor: payload.floor,
    building: payload.building,
    neighborhood: payload.neighborhood,
    newExport: false,
    todayDate: moment().format('YYYY-MM-DD'),
  };
  const requestURL = `${API_URL}/adminPanel/assignments/getAssigmentsData`;
  try {
    const assignmentList = yield request({
      method: 'POST',
      url: requestURL,
      data: pay,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = assignmentList;
    if (data.status === 403) {
      sessionStorage.clear();
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(getAssignmentDetailSuccess(data || []));
    } else {
      yield put(getAssignmentDetailFailed(data));
    }
  } catch (err) {
    yield put(getAssignmentDetailFailed('Please try again'));
  }
}

export function* getOfficeFloor({ payload }) {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  const requestURL = `${API_URL}/Building/getFloorByName`;
  try {
    const floorList = yield request({
      method: 'GET',
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
      method: 'GET',
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

export function* getExportData({ payload }) {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  const requestURL = `${API_URL}/adminPanel/assignments/getAssigmentsData`;
  try {
    const assignmentList = yield request({
      method: 'POST',
      url: requestURL,
      data: payload,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = assignmentList;
    if (data.status === 403) {
      sessionStorage.clear();
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(getExportDataSuccess(data || []));
    } else {
      yield put(getExportDataFailed(data));
    }
  } catch (err) {
    yield put(getExportDataFailed('Please try again'));
  }
}

export default function* assignmentSaga() {
  yield takeLatest(REQUEST_GET_ASSIGNMENT_DETAIL, getAssignmentData);
  yield takeLatest(REQUEST_GET_EXPORT_DATA, getExportData);
  yield takeLatest(REQUEST_GET_OFFICE_FLOOR, getOfficeFloor);
  yield takeLatest(REQUEST_GET_OFFICE_NEIGHBORHOOD, getOfficeNeighbourhood);
}
