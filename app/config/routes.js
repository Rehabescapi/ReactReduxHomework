import React, { Component } from 'react'
import { BrowserRouter as Router, IndexRoute, Redirect, Route, Switch } from 'react-router-dom'
import {MainContainer, HomeContainer, AuthenticateContainer, NotFoundContainer, FeedContainer, LogoutContainer} from 'containers'
import { firebaseAuth } from 'config/constants'

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}/>
  )
}

function LoggedInRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/feed' />}/>
  )
}

export default class GetRoutes extends Component {
    state = {
      authed: false,
      loading: true,
    }
    componentDidMount () {
      this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({
            authed: true,
            loading: false,
          })
        } else {
          this.setState({
            authed: false,
            loading: false,
          })
        }
      })
    }
    componentWillUnmount () {
      this.removeListener()
    }
    render () {
      return (
        <Router>
          <MainContainer>
            <Switch>
              <LoggedInRoute authed={this.state.authed} exact={true} path='/'
                component={HomeContainer}/>
              <LoggedInRoute authed={this.state.authed} path ='/login' component={AuthenticateContainer}/>
              <PrivateRoute authed={this.state.authed} path ='/feed' component={FeedContainer}/>
              <Route path='/logout' component={LogoutContainer}/>
              <Route component={NotFoundContainer}/>
            </Switch>
          </MainContainer>
        </Router>
      )
    }
}
