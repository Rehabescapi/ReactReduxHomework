import React from 'react'
import PropTypes from 'prop-types'
import { default as ReactModal } from 'react-modal'
import {
  newDecisionTop, pointer, newInputContainer,
  newInput, submitBtn, darkBtn, or, titleInput,
  titleContainer } from './styles.css'
import { formatDecision } from 'helpers/utils'

const modalStyle = {
  content: {
    width: 400,
    margin: '0px auto',
    height: 437,
    boderRadius: 5,
    background: '#EBEBEB',
    padding: 0,
  },
}

const { object, string, func, bool} = PropTypes

Modal.propTypes = {
  decisionText: string.isRequired,
  optionAText: string.isRequired,
  optionBText: string.isRequired,

  isOpen: bool.isRequired,

  user: PropTypes.object.isRequired,
  isSubmitDisabled: bool.isRequired,
  openModal: func.isRequired,
  closeModal: func.isRequired,
  updateDecisionText: func.isRequired,
  saveAndCloseModal: func.isRequired,
}

var counter = 0
export default function Modal (props) {
  function submitDecision () {
    props.saveAndCloseModal(formatDecision(props.decisionText, props.optionAText, props.optionBText, props.user))
  }
  return (
    <div>
      <span className={darkBtn} onClick={props.openModal}>
        {'New Decision'}</span>
      <ReactModal style ={modalStyle} isOpen={props.isOpen} onRequestClose={props.closeModal}>
        <div className= {newDecisionTop}>
          <span > {'What ya rather?'}</span>
          <span onClick={props.closeModal} className={pointer}>{'X'}</span>
        </div>
        <div className={titleContainer}>
          <input
            onChange={(e) => props.updateDecisionText('decisionText', e.target.value)}
            value={props.decisionText}
            maxLength={80}
            type='text'
            className={titleInput}
            placeholder='What would you rather'/>
        </div>

        <div className={newInputContainer}>
          <textarea
            onChange={(e) => props.updateDecisionText('optionAText', e.target.value)}
            value={props.optionAText}
            maxLength={140}
            type='text'
            className={newInput}
            placeholder='firstDecision'/>
        </div>

        <div className={or}>OR</div>
        <div className={newInputContainer}>
          <textarea
            onChange={(e) => props.updateDecisionText('optionBText', e.target.value)}
            value={props.optionBText}
            maxLength={140}
            type='text'
            className={newInput}
            placeholder='secondDecision'/>
        </div>
        <button
          className={submitBtn}
          disabled={props.isSubmitDisabled}
          onClick={submitDecision}>
          {'Submit'}
        </button>
      </ReactModal>

    </div>
  )
}
