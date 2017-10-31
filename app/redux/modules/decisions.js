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

function settingDecisionsListenerError () {
  return {
    type: SETTINGS_DECISIONS_LISTENER_ERROR,
    error: 'Error fetching Decisions',
  }
}

function addNewDecision (decision, decisionId) {
  return {
    type: ADD_DECISION,
    decision,
    decisionId,
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
      dispatch(settingDecisionsListenerSuccess(decision))
      Object.keys(decision).map((decisionId) => dispatch(addUser(decision[decisionId].author)))
    }, (error) => dispatch(settingDecisionsListenerError(error)))
  }
}

// thunk for setting and Handling DecisionListener

// decision

export function fetchAndHandleSingleDecision (decisionId) {
  return function (dispatch) {
    fetchSingleDecision(decisionId)
      .then((decision) => dispatch(addNewDecision(decision, decisionId)))
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
  switch (action.type) {
    case ADD_DECISION :
      return {
        ...state,
        isFetching: false,
        decision: {
          ...state.decision,
          [action.decisionId]: action.decision,
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

      return state
  }
}
