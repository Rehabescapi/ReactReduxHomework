import React, { Component} from 'react'
import PropTypes from 'prop-types'
import { Navigation } from 'components'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { container, innerContainer } from './styles.css'

import { formatUserInfo } from 'helpers/utils'
import { bindActionCreators } from 'redux'

import * as userActionCreators from 'redux/modules/user'
import { firebaseAuth } from 'config/constants'

class MainContainer extends Component {
  componentDidMount () {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        const userData = user.providerData[0]
        const userInfo = formatUserInfo(userData.displayName, user.uid)
        this.props.authUser(user.uid)
        this.props.fetchAndAddUsersMadeDecisions(user.uid)
          .then(() => this.props.fetchingUserSuccess(user.uid, userInfo, Date.now()))
          .then(() => {
            if (this.props.location.pathname === '/feed') {
              this.context.router.history.replace('feed')
            }
          })
      } else {
        this.props.removeFetchingUser()
      }
    })
  }

  render () {
    return this.props.isFetching === true
      ? null
      : <div className={container}>
        <Navigation isAuthed={this.props.isAuthed}/>
        <div className={innerContainer}> {this.props.children}</div>
      </div>
  }
}
MainContainer.propTypes = {
  children: PropTypes.any,
  isAuthed: PropTypes.bool.isRequired,
  authUser: PropTypes.func.isRequired,
  fetchingUserSuccess: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  location: PropTypes.object,
  removeFetchingUser: PropTypes.func.isRequired,

}

MainContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default withRouter(connect(
  ({users}) => ({isAuthed: users.isAuthed, isFetching: users.isFetching}),
  (dispatch) => bindActionCreators({...userActionCreators}, dispatch)
)(MainContainer))
