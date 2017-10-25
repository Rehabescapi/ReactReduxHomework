import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { Authenticate, Feed} from 'components'
import * as userActionCreators from 'redux/modules/user'
import { connect } from 'react-redux'
class FeedContainer extends Component {
  render () {
    return (
      <div>
        <Feed />
      </div>
    )
  }
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
  mapDispatchToProps)(FeedContainer)
