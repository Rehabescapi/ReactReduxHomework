import {ref } from './auth'

export function saveDecision (decision) {
    const decisionId = ref.child('devision').push().key
    return ref.child(`decision/${decisionId}`).set({...decision, decisionId})
}