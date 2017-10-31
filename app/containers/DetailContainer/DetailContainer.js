import React, {Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Detail } from 'components'
import { addAndHandleDecision } from 'redux/modules/user'
import { fetchAndHandleSingleDecision } from 'redux/modules/decisions'
import {withRouter } from 'react-router-dom'

class DetailContainer extends Component {
  componentDidMount () {
    if (this.props.decisionNeedsFetching === true) {
      this.props.fetchDecision()
    }
  }

  render () {
    return <div> {'woo'} </div>
  }
}

DetailContainer.propTypes = {
  decisionNeedsFetching: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  decision: PropTypes.object.isRequired,
  usersDecision: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
  fetchDecision: PropTypes.func.isRequired,
}

function mapStateToProps (props, {match}) {
  const users = props.users
  console.log(props.decisions)
  const decision = props.decisions.decision[match.params.decisionId]
  console.log(decision)

  return {
    isFetching: false,
    decisionNeedsFetching: typeof decision === 'undefined',
    decision: decision || {},
    usersDecision: users[users.authedId].decisionsMade[match.params.decisionId],
  }
}

function mapDispatchToProps (dispatch, state) {
  console.log(state.match.params)
  console.log(dispatch)
  const a = state.match.params.decideId
  return {
    onSelect: (option, switchingDecision) => dispatch(addAndHandleDecision(state.match.params.decideId, option, switchingDecision)),
    fetchDecision: () => dispatch(fetchAndHandleSingleDecision(a)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailContainer)
