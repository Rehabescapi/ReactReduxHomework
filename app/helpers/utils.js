import { decisionsExpirationLength } from 'config/constants'

export function formatUserInfo (name, uid, email = "") {
  return {
    name,
    uid,
    email
  }
}


export function formatDecision (title, decisionTextA, decisionTextB, user) {
  return {
    timestamp: Date.now(),
    author: user,
    title,
    optionA: {
      text: decisionTextA,
      selectedCount: 0,
    },
    optionB: {
      text: decisionTextB,
      selectedCount: 0,
    },
  }
}

export function formatTimestamp (timestamp) {
  const date = new Date(timestamp)
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

function getMilliseconds (timestamp) {
  return new Date().getTime() - new Date(timestamp).getTime()
}

export function decisionsAreStale (timestamp) {
  return getMilliseconds(timestamp) > decisionsExpirationLength
}
