import { put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { REQUEST_GET_OFFICE_LOCATION } from './constants';
import { getOfficeLocationSuccess, getOfficeLocationFailed } from './actions';
import { CONSTANT } from '../../enum';

const { API_URL } = CONSTANT;

export function* getLocationData() {
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/location/GetData`;
  try {
    const usersList = yield request({
      method: 'GET',
      url: requestURL,
    });
    const { data } = usersList;
    if (data && data.success) {
      yield put(getOfficeLocationSuccess(data.data));
    } else {
      yield put(getOfficeLocationFailed(data.message));
    }
  } catch (err) {
    yield put(getOfficeLocationFailed(err.message));
  }
}

export default function* locationData() {
  yield takeLatest(REQUEST_GET_OFFICE_LOCATION, getLocationData);
}
