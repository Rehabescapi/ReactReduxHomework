import { listenToDecisions, fetchSingleDecision } from 'helpers/api'
import { addListener } from 'redux/modules/listeners'
import { addUser } from 'redux/modules/listeners'


const SETTINGS_DECISIONS_LISTENER = 'SETTINGS_DECISIONS_LISTENER'
const SETTINGS_DECISIONS_LISTENER_ERROR = 'SETTINGS_DECISIONS_LISTENER_ERROR'
const SETTINGS_DECISIONS_LISTENER_SUCCESS = 'SETTINGS_DECISIONS_LISTENER_SUCCESS'
const ADD_DECISION = 'ADD_DECISION'


function settingDecisionsListener () {
    return {
        type : SETTINGS_DECISIONS_LISTENER,
    }
}

function settingDecisionsListenerError( error) {
    return {
        type: SETTINGS_DECISIONS_LISTENERERROR ,
        error : 'Error fetching Decisions',
    }
}

function settingDecisionsListenerSuccess (data) { 
    return {
        type:SETTINGS_DECISIONS_LISTENER_SUCCESS,
        data,
        timestamp : Date.now(),
    }
}

export function setAndHandleDecisionListener () {
    return function (dispatch, getState ){
        if(getState().listeners.decisions === true)
        return 

        let initialFetch=true
        dispatch(addListener('decisions'))
        dispatch(settingDecisionsListener())

        listenToFeed((decision)=> {
            dispatch(settingDecisionsListenerSuccess(decision))
           Object.keys(decision).map((dicisionId) => dispatch(addUser(decisions[decisionId].author)))
        }, (error) => dispatch(settingDecisionsListenerError(error)))
    }
}


//thunk for setting and Handling DecisionListener




function addDecision ( decisionId, decision) {
    return 
    {
        type : ADD_DECISION,
        decisionId,
        decision
    }
}


export function fetchAndHandleSingleDecision (decisionId) {
    return function (dispatch) {
      fetchSingleDecision(decisionId)
        .then((decision) => dispatch(addDecision(decisionId, decision)))
        .catch((error) => console.warn('Error fetching decision', error))
    }
  }
///Thunk for fetchinandHandleSingleDecision


const initialState= {
    lastUpdated : 0, 
    isFetching: true,
    error : '',
    decisions: {}, 
}

export default function decisions(state = initialState, action)
{
    switch(action.type){
        case SETTINGS_DECISIONS_LISTENER:
        return {
            ...state,
            isFetching : true,
        }
        case SETTINGS_DECISIONS_LISTENER_ERROR :
        return {
            ...state, 
            isFetching : false,
            error : action.error,
        }
        case SETTINGS_DECISIONS_LISTENER_SUCCESS:
        {
            return {
                ...state, 
                lastUpdated : action.timestamp || state.lastUpdated,
                isFetching : false,
                error : '',
                decision :{
                    ...state.decisions,
                    [action.decisionId] : action.decision,
                }
            }
        }
        default : 
        return state
}
}