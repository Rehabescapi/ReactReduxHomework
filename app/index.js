import React from 'react'
import ReactDOM from 'react-dom'
import GetRoutes from 'config/routes'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import * as reducers from 'redux/modules'
import createHistory from 'history/createBrowserHistory'

const logMiddleware = ({getState, dispatch} ) => (next) => (action ) => {
  console.log(`Action : ${action.type}`);
  next(action);
};


import thunk from 'redux-thunk'
const middleware = routerMiddleware(createHistory())

const store = createStore(combineReducers({...reducers, routing: routerReducer}),
  compose(applyMiddleware(middleware, thunk,logMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f))

ReactDOM.render(
  <Provider store = {store}>
    <GetRoutes />
  </Provider>,
  document.getElementById('app')
)
