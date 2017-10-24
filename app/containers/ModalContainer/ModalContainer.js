import {bindActionCreators} from 'redux'
import {Modal } from 'components'
import {connect } from 'react-redux'
import * as modalActionCreators from 'redux/modules/modal'

function isSubmitDisabled (firstText, seconText, title ) {

}


function mapStateToProps({modal, users}){
    return {
        user : users[users.authedId]? users[users.authedId].info : {},
    }
}


function mapDispatchToProps (dispatch) {
    return bindActionCreators(modalActionCreators, dispatch)
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Modal)
  