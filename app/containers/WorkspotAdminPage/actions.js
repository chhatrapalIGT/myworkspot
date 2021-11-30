import {
  REQUEST_LOCATION_CAPACITY,
  SUCCESS_LOCATION_CAPACITY,
  FAILED_LOCATION_CAPACITY,
} from './constants';

export const requestLocationCapacity = payload => ({
  type: REQUEST_LOCATION_CAPACITY,
  payload,
});

export const locationCapacitySuccess = payload => ({
  type: SUCCESS_LOCATION_CAPACITY,
  payload,
});

export const locationCapacityFailed = error => ({
  type: FAILED_LOCATION_CAPACITY,
  payload: error,
});
