import { listenToFeed, fetchSingleDecision } from 'helpers/api'
import { addListener } from 'redux/modules/listeners'
import { addUser } from 'redux/modules/user'

const SETTINGS_DECISIONS_LISTENER = 'SETTINGS_DECISIONS_LISTENER'
const SETTINGS_DECISIONS_LISTENER_ERROR = 'SETTINGS_DECISIONS_LISTENER_ERROR'
const SETTINGS_DECISIONS_LISTENER_SUCCESS = 'SETTINGS_DECISIONS_LISTENER_SUCCESS'
const ADD_DECISION = 'ADD_DECISION'

function settingDecisionsListener () {
  return {
    type: SETTINGS_DECISIONS_LISTENER,
  }
}

function settingDecisionsListenerError (error) {
  console.log('error')
  return {
    type: SETTINGS_DECISIONS_LISTENERERROR,
    error: 'Error fetching Decisions',
  }
}

function addDecision (decisionId, decision) {
  console.log(decisionId, decision)
  const data = {decisionId, decision}
  return
  {
    ADD_DECISION,
    data
  }
}

function settingDecisionsListenerSuccess (data) {
  return {
    type: SETTINGS_DECISIONS_LISTENER_SUCCESS,
    data,
    timestamp: Date.now(),
  }
}

export function setAndHandleDecisionsListener () {
  return function (dispatch, getState) {
    if (getState().listeners.decisions === true) {
      return
    }
    dispatch(addListener('decision'))
    dispatch(settingDecisionsListener())

    listenToFeed((decision) => {
      console.log(decision)
      dispatch(settingDecisionsListenerSuccess(decision))
      Object.keys(decision).map((decisionId) => dispatch(addUser(decision[decisionId].author)))
    }, (error) => dispatch(settingDecisionsListenerError(error)))
  }
}

// thunk for setting and Handling DecisionListener

// decision

export function fetchAndHandleSingleDecision (decisionId) {
  console.log(decisionId)
  return function (dispatch) {
    console.log(dispatch)
    fetchSingleDecision(decisionId)
      .then((decision) => dispatch(addDecision(decisionId, decision)))
      .catch((error) => console.warn('Error fetching decision', error))
  }
}
/// Thunk for fetchinandHandleSingleDecision

const initialState = {
  lastUpdated: 0,
  isFetching: true,
  error: '',
  decision: {},
}

export default function decisions (state = initialState, action) {
  console.log(action.type)
  switch (action.type) {
    case ADD_DECISION :
      console.log('wooo')
      return {
        ...state,
        isFetching: false,
        decision: {
          ...state.decision,
          [action.AdecisionId]: action.Adecision,
        },
      }

    case SETTINGS_DECISIONS_LISTENER:
      return {
        ...state,
        isFetching: true,
      }
    case SETTINGS_DECISIONS_LISTENER_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case SETTINGS_DECISIONS_LISTENER_SUCCESS:
      return {
        ...state,
        lastUpdated: action.timestamp || state.lastUpdated,
        isFetching: false,
        error: '',
        decision: {
          ...state.decision,
          ...action.data,
        },
      }

    default :
      console.log(action)
      return state
  }
}
