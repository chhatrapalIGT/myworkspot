import { put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'react-router-redux';
import { REQUEST_LOCATION_CAPACITY } from './constants';
import { locationCapacitySuccess, locationCapacityFailed } from './actions';
import { CONSTANT } from '../../enum';

const { API_URL } = CONSTANT;

export function* getLocationCapacity({ payload }) {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/adminPanel/locationCapacity/LocationCapacity?startdate=${
    payload.startdate
  }&enddate=${payload.enddate}`;

  try {
    const getCapacity = yield request({
      method: 'GET',
      url: requestURL,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = getCapacity;
    if (getCapacity.status === 403) {
      sessionStorage.clear();

      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(locationCapacitySuccess(data));
    } else {
      yield put(locationCapacityFailed(data.message));
    }
  } catch (err) {
    yield put(locationCapacityFailed(err.message));
  }
}

export default function* officeMapData() {
  yield takeLatest(REQUEST_LOCATION_CAPACITY, getLocationCapacity);
}
