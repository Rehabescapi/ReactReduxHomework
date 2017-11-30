import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
import * as user  from '../modules/user'


  const proxyquire = require('proxyquire')
  const firebasemock = require('firebase-mock')
const mockdatabase = new firebasemock.MockFirebase();
const mockauth =  new firebasemock.MockFirebase();
const mocksdk = firebasemock.MockFirebaseSdk(path => {
  return path ? mockdatabase.child(path) : mockdatabase
}, () => {
  return mockauth;
})
var mySrc = proxyquire('../../config/constants', {
  firebase: mocksdk
});
mockdatabase.flush();
const firebaseApp = mocksdk.initializeApp();

const initialUserState = {
    lastUpdated: 0,
    info: {
      name: '',
      uid: '',
    },
    decisionsMade: {},
  }

jest.mock('')
describe('async action',  () => {

    it('should dispatch actions of user thunk', async () => {
        const expectedActions = [
          {type: 'FETCHING_USER'},
          {type: 'fetchingUserSuccess', payload: 'b'} ,
          {type : 'authUser' , payload:'c'}
        ]
    
            const emailProp  = {
                email : 'JasonMLehmann@gmail.com',
                password : 'password1'
            }
            const form = {
              type : 'EMAIL_AUTH'
            }
            
        const store = mockStore({ initialUserState })
        store.dispatch(user.fetchAndHandleAuthedUser(form.type, emailProp ))
    
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
