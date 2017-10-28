import { ref } from 'config/constants'

export function saveDecision (decision) {
  const decisionId = ref.child('decisions').push().key
  return ref.child(`decision/${decisionId}`).set({...decision, decisionId})
}


export function listenToFeed (cb , errorCB){
  ref.child('decisions').on('value',(snapshot)=> {
    const feed= snapshot.val() || {}
    const sortedIds= object.keys(feed).sort((a,b)=>{
      return feed[b].timestamp - feed[a].timestamp
    })
    cb({feed, sortedIds})
  },errorCB)
}


export function fecthSingleDecision(decisionId){
  return ref.child(`decisions/${decisionId}`)
  .once('value')
  .then((snapshot) => snapshot.val () || {})
}