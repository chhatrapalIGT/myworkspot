import workSpotSaga from './containers/WorkspotPage/saga';
import officeMapData from './containers/OfficeMapPage/saga';
import locationData from './containers/onBoardingPage/saga';
import profileSaga from './containers/ProfilePage/saga';
import employeeSaga from './containers/EmployeePage/saga';
import uploadSaga from './containers/UploadMapPage/saga';
import spaceSaga from './containers/SpacePage/saga';
// import myTeamSaga from './containers/ReportPage/saga';

import getInjectors from './utils/sagaInjectors';

export function injectGlobalSagas(store) {
  const injectors = getInjectors(store);
  let key = 'workspot';
  injectors.injectSaga(key, { saga: workSpotSaga });
  key = 'officeData';
  injectors.injectSaga(key, { saga: officeMapData });
  key = 'locationData';
  injectors.injectSaga(key, { saga: locationData });
  key = 'profile';
  injectors.injectSaga(key, { saga: profileSaga });
  key = 'employee';
  injectors.injectSaga(key, { saga: employeeSaga });
  key = 'uploadOffice';
  injectors.injectSaga(key, { saga: uploadSaga });
  key = 'space';
  injectors.injectSaga(key, { saga: spaceSaga });
  // key = 'myTeam';
  // injectors.injectSaga(key, { saga: myTeamSaga });
}
