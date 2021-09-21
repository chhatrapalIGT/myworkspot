import { createSelector } from 'reselect';
const selectUser = state => state.user;

const selectRouter = state => state.router;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeUserSelector = () =>
  createSelector(
    selectUser,
    userState => userState,
  );

export { makeSelectLocation, makeUserSelector };
