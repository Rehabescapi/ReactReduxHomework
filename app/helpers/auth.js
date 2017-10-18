import { ref, firebaseAuth } from 'config/constants'

export function auth (authType){
    switch(authType) { 
        case 'FACEBOOK_AUTH':
        return firebaseAuth().signInWithPopup(new firebaseAuth.FacebookAuthProvider())
        case 'FORM_AUTH':
        default : 
        firebaseAuth().signInWithPopup( new firebaseAuth.EmailAuthProvider.credential(email, password))
    }

}

export function checkIfAuthed (store) {
    return store.getState().users.isAuthed
  }

export function logout () {
    return firebaseAuth().signOut()
}
export function saveUser (user){
    console.log(user);
    console.log('userSaved');
return ref.child(`users/${user.uid}/info`)
.set(user)
.then(()=> user)
}