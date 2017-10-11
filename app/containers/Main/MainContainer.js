import React, { Component} from 'react'
import PropTypes from 'prop-types'
import { Navigation } from 'components'
import { connect } from 'react-redux'
import { container, innerContainer } from './styles.css'
 class  MainContainer extends Component {

    render (){
       return (
        <div className = {container}>
            <Navigation isAuthed={this.props.isAuthed}/>
            <div className={innerContainer}> {this.props.children}</div>
        </div>
       )
    }
}
MainContainer.propTypes = {
    isAuthed: PropTypes.bool.isRequired
}

export default connect(({users}) => ({isAuthed: users.isAuthed}))(MainContainer)