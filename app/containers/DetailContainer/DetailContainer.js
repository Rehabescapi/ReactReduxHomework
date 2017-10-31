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
    return <Detail {...this.props} />
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

function mapStateToProps ({users, decisions}, {match}) {
  
  const decision = decisions.decision[match.params.decideId]
    console.log(decision)
  return {
    isFetching: decisions.isFetching,
    decisionNeedsFetching: typeof decision === 'undefined',
    decision: decision || {},
    usersDecision: users[users.authedId].decisionsMade[match.params.decideId],
  }
}

function mapDispatchToProps (dispatch, {match}) {
 
  return {
    onSelect: (option, switchingDecision) => dispatch(addAndHandleDecision(match.params.decideId, option, switchingDecision)),
    fetchDecision: () => dispatch(fetchAndHandleSingleDecision(match.params.decideId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailContainer)
