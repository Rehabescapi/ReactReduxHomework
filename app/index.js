import React , { Component } from 'react'
import ReactDOM from 'react-dom'
import GetRoutes from 'config/routes'
import { createStore, applyMiddleware, compose, combineReducers} from 'redux'
import { Provider } from 'react-redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import * as reducers from 'redux/modules'
import createHistory from 'history/createBrowserHistory'
import restricted from 'helpers/restricted'
import thunk from 'redux-thunk'
const history = createHistory();
const middleware = routerMiddleware(history)

const store = createStore(combineReducers({...reducers, routing: routerReducer}),
compose (applyMiddleware(middleware, thunk ) ,
window.devToolsExtension ? window.devToolsExtension() : (f) => f))


function checkAuth( component) {
  
  return restricted(component, store)
}

ReactDOM.render(
  <Provider store = {store}>
    <GetRoutes  />
    </Provider>,
  document.getElementById('app')
)