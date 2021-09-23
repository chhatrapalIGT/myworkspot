// /**
//  * Gets the repositories of the user from Github
//  */

// import { put, takeLatest } from 'redux-saga/effects';
// import request from 'utils/request';

// import { REQUEST_GET_LOCATION } from './constants';

// import { getLocationSuccess, getLocationFailed } from './actions';
// import { CONSTANT } from '../../enum';

// const { API_URL } = CONSTANT;

// export function* getLocation() {
//   const requestURL = `${API_URL}/location/GetData`;
//   try {
//     const locationList = yield request({
//       method: 'GET',
//       url: requestURL,
//     });
//     const { data } = locationList;
//     if (data && data.success) {
//       yield put(getLocationSuccess(data.data));
//     } else {
//       yield put(getLocationFailed(data));
//     }
//   } catch (err) {
//     yield put(getLocationFailed(err));
//   }
// }

// export default function* reportSaga() {
//   yield takeLatest(REQUEST_GET_LOCATION, getLocation);
// }
