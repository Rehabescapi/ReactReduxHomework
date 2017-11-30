import { ref, firebaseAuth } from 'config/constants'

export function auth (authType, credential) {
  console.log(authType,credential)
  switch (authType) {
    case 'FACEBOOK_AUTH':
      return firebaseAuth().signInWithPopup(new firebaseAuth.FacebookAuthProvider())
    case 'EMAIL_AUTH':
    return emailAuth(credential)
      case 'EMAIL_LOGIN':
      return login(credential)
    default :
      firebaseAuth().signInWithPopup(new firebaseAuth.EmailAuthProvider.credential())
  }
}

export function emailAuth ({email, password, username ="TempUser"}) {
  return  firebaseAuth().createUserWithEmailAndPassword(email, password)
   .then(function(user){
      user.updateProfile({'displayName': username})
   })
   .catch(function(error) {
    console.log(error)
});
  
}

export function checkIfAuthed (store) {
  return store.getState().users.isAuthed
}

export function login ({email, password}) {
  return firebaseAuth().signInWithEmailAndPassword(email, password)
 
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
    }).then(()=> user)
}

export function saveUser (user) {
  console.log(user)
  return ref.child(`users/${user.uid}/info`)
    .set(user)
    .then(() => user)
}
