import { ref, firebaseAuth } from 'config/constants'

export function auth (authType) {
  switch (authType) {
    case 'FACEBOOK_AUTH':
      return firebaseAuth().signInWithPopup(new firebaseAuth.FacebookAuthProvider())
    case 'FORM_AUTH':
    default :
      firebaseAuth().signInWithPopup(new firebaseAuth.EmailAuthProvider.credential(email, password))
  }
}

export function emailAuth(email, pw) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
  .then(saveUser)
}

export function checkIfAuthed (store) {
  console.log(store.getState())
  return store.getState().users.isAuthed
}

export function login (email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function resetPassword (email) {
  return firebaseAuth().sendPasswordResetEmail(email)
}

export function logout () {
  return firebaseAuth().signOut()
}
export function saveUserEmail(user) {
  return ref.child9(`/users/${user.uid}/info`)
  .set({email : user.email,
  uid : user.uid
})
}

export function saveUser (user) {
  return ref.child(`users/${user.uid}/info`)
    .set(user)
    .then(() => user)
}
