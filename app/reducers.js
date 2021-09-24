/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import workspotReducer from './containers/WorkspotPage/reducer';
import OfficeReducer from './containers/OfficeMapPage/reducer';
import onBoardingReducer from './containers/onBoardingPage/reducer';
import profilePageReducer from './containers/ProfilePage/reducer';
// import myTeamReducer from './containers/ReportPage/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    workspot: workspotReducer,
    officeData: OfficeReducer,
    locationData: onBoardingReducer,
    profile: profilePageReducer,
    // myTeam: myTeamReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
