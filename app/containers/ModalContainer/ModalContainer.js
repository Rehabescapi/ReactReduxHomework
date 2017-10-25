import { bindActionCreators } from 'redux'
import { Modal } from 'components'
import { connect } from 'react-redux'
import * as modalActionCreators from 'redux/modules/modal'

function isSubmitDisabled (title, firstText, secondText) {
  console.log(firstText.length, secondText.length, title.length)

  return firstText.length <= 0 ||
    firstText.length > 140 ||
    secondText.length <= 0 ||
    secondText.length > 140 ||
    title.length <= 0 ||
    title.length > 140
}

function mapStateToProps ({modal, users}) {
  console.log(modal.decisionText, modal.optionAText, modal.optionBText)
  return {
    user: users[users.authedId] ? users[users.authedId].info : {},
    decisionText: modal.decisionText,
    optionAText: modal.optionAText,
    optionBText: modal.optionBText,
    isOpen: modal.isOpen,
    isSubmitDisabled: isSubmitDisabled(modal.decisionText, modal.optionAText, modal.optionBText),
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(modalActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Modal)
