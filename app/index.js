import React , { Component } from 'react'
import ReactDOM from 'react-dom'
import getRoutes from 'config/routes'
import { createStore, applyMiddleware, compose, combineReducers} from 'redux'
import { Provider } from 'react-redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import * as reducers from 'redux/modules'
import createHistory from 'history/createBrowserHistory'

const history = createHistory();
const middleware = routerMiddleware(history)

const store = createStore(combineReducers({...reducers, routing: routerReducer}),
compose (applyMiddleware(middleware) ,
window.devToolsExtension ? window.devToolsExtension() : (f) => f))


function checkAuth( nextState, replace) {
  return true
}

ReactDOM.render(
  <Provider store = {store}>
    {getRoutes(checkAuth, history)}
    </Provider>,
  document.getElementById('app')
)