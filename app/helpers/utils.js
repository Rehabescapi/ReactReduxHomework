
export function formatUserInfo (name, uid) {
  return {
    name,
    uid,
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
