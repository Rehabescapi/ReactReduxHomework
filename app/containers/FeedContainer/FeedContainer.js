import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { Feed} from 'components'
import { setAndHandleDecisionsListener } from 'redux/modules/decisions'
import { connect } from 'react-redux'
import { decisionsAreStale } from 'helpers/utils'
import {Router, browserHistory} from 'react-router'
import {withRouter } from 'react-router-dom'
class FeedContainer extends Component {
  constructor (props) {
    super(props)
    this.handleToDecide = this.handleToDecide.bind(this)
  }
  componentDidMount () {
    if (decisionsAreStale(this.props.lastUpdated)) {
      this.props.setAndHandleDecisionsListener()
    }
  }
  handleToDecide (decisionId) {
    this.context.router.history.replace('details/' + decisionId)
    // browserHistory.push('/decide/' + decisionId)
  }

  render () {
    return (
      <div>
        <Feed
          isFetching = {this.props.isFetching}
          error = {this.props.error}
          decisions={this.props.decisions}
          decisionsMade= {this.props.decisionsMade}
          onToDecide = {this.handleToDecide}/>
      </div>
    )
  }
}

FeedContainer.propTypes = {
  decisionsMade: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  decisions: PropTypes.array.isRequired,
  lastUpdated: PropTypes.number.isRequired,
  setAndHandleDecisionsListener: PropTypes.func.isRequired,
}

FeedContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}
function mapStateToProps ({decisions, users}) {
  const decs = decisions.decision
  return {
    decisionsMade: users[users.authedId].decisionsMade,
    isFetching: decisions.isFetching,
    lastUpdated: decisions.lastUpdated,
    error: decisions.error,
    decisions: Object.keys(decs)
      .sort((a, b) => decs[b].timestamp - decs[a].timestamp)
      .map((id) => decs[id]),

  }
}

function mapDispatchToProps (dispatch) {
  return {
    setAndHandleDecisionsListener: () => dispatch(setAndHandleDecisionsListener()),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps)(FeedContainer))
