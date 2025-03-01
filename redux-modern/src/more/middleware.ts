import { MiddlewareAPI } from '@reduxjs/toolkit';

export const middleware = ({dispatch, getState}: MiddlewareAPI) => (next: any) => (action: any) => {
  console.log('Middleware', action);
  return next(action);
}

export const loggingMiddleware = ({dispatch, getState}) => next => action => {
  console.log('Dispatching', action);
  const result = next(action);
  console.log('State after dispatch', getState());
  return result;
}

export const resolvePromiseMiddleware = ({dispatch, getState}) => next => action => {
  if (action.payload instanceof Promise) {
    return action.payload.then(result => dispatch({...action, payload: result}));
  }
  return next(action);
}
