import {Middleware, combineReducers, configureStore, createAction} from '@reduxjs/toolkit';

import {createLogger} from 'redux-logger';

import {sectionBlueprintMiddleware} from '@src/navsections/sectionBlueprintMiddleware';

import {configSlice, crdsPathChangedListener, k8sVersionSchemaListener} from './appConfig';
import {appConfigListeners} from './appConfig/appConfig.listeners';
import * as compareListeners from './compare/listeners';
import {compareSlice} from './compare/slice';
import {dashboardSlice} from './dashboard';
import {formSlice} from './forms';
import {gitSlice} from './git';
import {combineListeners, listenerMiddleware} from './listeners/base';
import {alertSlice} from './reducers/alert';
import {extensionSlice} from './reducers/extension';
import {mainSlice} from './reducers/main';
import {imageListParserListener} from './reducers/main/mainListeners';
import {navigatorSlice, updateNavigatorInstanceState} from './reducers/navigator';
import {killTerminalProcessesListener, terminalSlice} from './reducers/terminal';
import {uiSlice} from './reducers/ui';
import {validationListeners} from './validation/validation.listeners';
import {validationSlice} from './validation/validation.slice';

const middlewares: Middleware[] = [];

if (process.env.NODE_ENV === `development`) {
  const reduxLoggerMiddleware = createLogger({
    predicate: (getState, action) => action.type !== updateNavigatorInstanceState.type,
    collapsed: (getState, action, logEntry) => !logEntry?.error,
  });

  middlewares.push(reduxLoggerMiddleware);
}

export const resetStore = createAction('app/reset');

combineListeners([
  compareListeners.resourceFetchListener('left'),
  compareListeners.resourceFetchListener('right'),
  compareListeners.compareListener,
  compareListeners.filterListener,
  killTerminalProcessesListener,
  k8sVersionSchemaListener,
  crdsPathChangedListener,
  ...validationListeners,
  ...appConfigListeners,
  imageListParserListener,
]);

const appReducer = combineReducers({
  alert: alertSlice.reducer,
  compare: compareSlice.reducer,
  config: configSlice.reducer,
  extension: extensionSlice.reducer,
  main: mainSlice.reducer,
  navigator: navigatorSlice.reducer,
  terminal: terminalSlice.reducer,
  ui: uiSlice.reducer,
  git: gitSlice.reducer,
  form: formSlice.reducer,
  validation: validationSlice.reducer,
  dashboard: dashboardSlice.reducer,
});

const rootReducer: typeof appReducer = (state, action) => {
  if (resetStore.match(action)) {
    // Invoking reducers with `undefined` sets initial state.
    // see https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store/35641992#35641992
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    })
      .prepend(listenerMiddleware.middleware)
      .concat(middlewares)
      .concat(sectionBlueprintMiddleware),
});

export default store;
