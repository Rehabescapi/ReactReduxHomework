import { ref, firebaseAuth } from 'config/constants'

export function auth (authType, credential) {
  console.log(credential)
  switch (authType) {
    case 'FACEBOOK_AUTH':
      return firebaseAuth().signInWithPopup(new firebaseAuth.FacebookAuthProvider())
    case 'FORM_AUTH':
      return emailAuth(credential.email, credential.password)
    default :
      firebaseAuth().signInWithPopup(new firebaseAuth.EmailAuthProvider.credential())
  }
}

export function emailAuth (email, pw) {
  console.log(pw)
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then(saveUserEmail)
}

export function checkIfAuthed (store) {
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
export function saveUserEmail (user) {
  return ref.child(`/users/${user.uid}/info`)
    .set({
      name: user.email,
      email: user.email,
      uid: user.uid,
    })
}

export function saveUser (user) {
  return ref.child(`users/${user.uid}/info`)
    .set(user)
    .then(() => user)
}
