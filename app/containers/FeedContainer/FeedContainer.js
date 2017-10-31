import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { Feed} from 'components'
import { setAndHandleDecisionsListener } from 'redux/modules/decisions'
import { connect } from 'react-redux'
import { decisionsAreStale } from 'helpers/utils'
class FeedContainer extends Component {
  
  componentDidMount () {
    console.log( this.props.lastUpdated)
    if (decisionsAreStale(this.props.lastUpdated)) {
      console.log('stale')
      this.props.setAndHandleDecisionsListener()
    }
    {
      console.log('not stale')
    }
  
  }
 
  render () {
    return (
      <div>
        <Feed
        isFetching = {this.props.isFetching}
        error = {this.props.error}
        decisions={this.props.decisions}
         />
      </div>
    )
  }
}

FeedContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error : PropTypes.string.isRequired,
  decisions : PropTypes.array.isRequired,
  lastUpdated : PropTypes.number.isRequired,
  setAndHandleDecisionsListener : PropTypes.func.isRequired,
}

FeedContainer.contextTypes = {
  router : PropTypes.object.isRequired,
}
function mapStateToProps ({decisions, users}) {
  console.log(decisions)
  const decs = decisions.decision
  return {
    isFetching: decisions.isFetching,
    lastUpdated : decisions.lastUpdated,
    error : decisions.error,
    decisions : Object.keys(decs) 
    .sort((a,b) => decs[b].timestamp - decs[a].timestamp)
    .map((id) => decs[id]),
  
  }
}

function mapDispatchToProps (dispatch) {
 
  return {
    setAndHandleDecisionsListener : () => dispatch(setAndHandleDecisionsListener())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(FeedContainer)
