import {
  REQUEST_LOCATION_CAPACITY,
  SUCCESS_LOCATION_CAPACITY,
  FAILED_LOCATION_CAPACITY,
  RESET_WORKSPOT_ADMIN_MESSAGE,
  REQUEST_CAPACITY_WARNING,
  SUCCESS_CAPACITY_WARNING,
  FAILED_CAPACITY_WARNING,
  REQUEST_EXPORT_LOCATION_CAPACITY,
  SUCCESS_EXPORT_LOCATION_CAPACITY,
  FAILED_EXPORT_LOCATION_CAPACITY,
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

export const requestExportLocationCapacity = payload => ({
  type: REQUEST_EXPORT_LOCATION_CAPACITY,
  payload,
});

export const successExportLocationCapacity = payload => ({
  type: SUCCESS_EXPORT_LOCATION_CAPACITY,
  payload,
});

export const failedExportLocationCapacity = error => ({
  type: FAILED_EXPORT_LOCATION_CAPACITY,
  payload: error,
});

export const resetWorkspotAdminMessage = () => ({
  type: RESET_WORKSPOT_ADMIN_MESSAGE,
});

export const requestCapacityWarning = payload => ({
  type: REQUEST_CAPACITY_WARNING,
  payload,
});

export const capacityWarningSuccess = payload => ({
  type: SUCCESS_CAPACITY_WARNING,
  payload,
});

export const capacityWarningFailed = error => ({
  type: FAILED_CAPACITY_WARNING,
  payload: error,
});
