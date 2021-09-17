import workSpotSaga from './containers/WorkspotPage/saga';

import getInjectors from './utils/sagaInjectors';

export function injectGlobalSagas(store) {
  const injectors = getInjectors(store);
  const key = 'workspot';
  injectors.injectSaga(key, { saga: workSpotSaga });
}
