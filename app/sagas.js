import workSpotSaga from './containers/WorkspotPage/saga';
import officeMapData from './containers/OfficeMapPage/saga';
import locationData from './containers/onBoardingPage/saga';
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
  // key = 'myTeam';
  // injectors.injectSaga(key, { saga: myTeamSaga });
}
