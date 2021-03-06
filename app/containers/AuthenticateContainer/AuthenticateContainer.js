import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Authenticate } from 'components'
import * as userActionCreators from 'redux/modules/user'

class AuthenticateContainer extends Component {
  constructor (props) {
    super(props)
    this.handleAuth = this.handleAuth.bind(this)
  }

  handleAuth (e, authType, credential) {
    console.log(authType,credential)
    this.props.fetchAndHandleAuthedUser(authType, credential)
      .then(() => this.context.router.history.replace('feed'))
  }

  render () {
    return (
      <div>

        <Authenticate
          isFetching = {this.props.isFetching}
          error = {this.props.error}
          onAuth= {this.handleAuth}/>
      </div>
    )
  }
}

AuthenticateContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fetchAndHandleAuthedUser: PropTypes.func.isRequired,
}

AuthenticateContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

function mapStateToProps (state) {
  return {
    isFetching: state.users.isFetching,
    error: state.users.error,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(userActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(AuthenticateContainer
)
