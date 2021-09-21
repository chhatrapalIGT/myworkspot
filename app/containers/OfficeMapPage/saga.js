import { put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { REQUEST_GET_OFFICE_DATA } from './constants';
import { getOfficeDataSuccess, getOfficeDataFailed } from './actions';
import { CONSTANT } from '../../enum';

const { API_URL } = CONSTANT;

export function* getData() {
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/building/get`;
  try {
    const usersList = yield request({
      method: 'GET',
      url: requestURL,
    });
    const { data } = usersList;
    if (data && data.success) {
      yield put(getOfficeDataSuccess(data.response));
    } else {
      yield put(getOfficeDataFailed(data.message));
    }
  } catch (err) {
    yield put(getOfficeDataFailed(err.message));
  }
}

export default function* officeMapData() {
  yield takeLatest(REQUEST_GET_OFFICE_DATA, getData);
}
