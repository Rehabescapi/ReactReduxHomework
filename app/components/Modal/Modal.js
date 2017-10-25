import React from 'react'
import PropTypes from 'prop-types'
import { default as ReactModal } from 'react-modal'
import {
  newDecisionTop, pointer, newDecisionInputContainer,
  newDecisionInput, submitDecisionBtn, darkBtn, or, titleInput,
  titleContainer } from './styles.css'
import { formatDecision } from 'helpers/utils'


const modalStyle = {
content :{
    width : 400,
    margin : '0px auto',
    height : 437,
    boderRadius: 5, 
    background : '#EBEBEB',
    padding: 0,
},
}

const { object,  string , func , bool} = PropTypes

Modal.PropTypes={
    decisionText:string.isRequired,
    optionAText: string.isRequired,
    optionBText:string.isRequired,

    isOpen:bool.isRequired,

    user: PropTypes.object.isRequired,
    isSubmitDisabled: bool.isRequired,
    openModal : func.isRequired,
    closeModal : func.isRequired,
    updateDecisionText: func.isRequired,
    saveAndCloseModal: func.isRequired,
}


export default function Modal (props){

    function submitDecision () {
        props.saveAndCloseModal(formatDecision(props.titleText, props.firstDecisionText, props.secondDecisionText, props.user))
      }

      return (
        <span className={darkBtn} onClick={props.openModal}>
        {'New Decision'}
        <ReactModal style ={modalStyle} isOpen={props.isOpen} onRequestClose={props.closeModal}>
            <div className= {newDecisionTop}>
                </div>
                <div className={titleContainer}>
                </div>
                <div className={newDecisionInputContainer}>
                </div>
                <div className={or}>OR</div>
        <div className={newDecisionInputContainer}>
            <textarea
            onChange={(e)=> props.updateDecisionText('optionBText', e.target.value)}
            value={props.secondDecisionText}
            maxLength={140}
            type='text'
            className={newDecisionInput}
            placeholder='secondDecision'
            />
            </div>
            <button 
            className={submitDecisionBtn}
            disabled={props.isSubmitDisabled}
            onClick={submitDecision}>
            {'Submit'}
            </button>
            </ReactModal>
        </span>
      )
}