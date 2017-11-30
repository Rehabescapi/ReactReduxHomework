
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
var MockFirebase = require ('firebase-mock').MockFirebase
import expect from 'expect'
import * as user  from '../modules/user'
const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);


require('firebase-functions').config = jest.fn(() => {
    console.log('Jest firebase functions.config being called');
    return {
      firebase: {
        databaseURL: 'https://not-a-project.firebaseio.com',
        storageBucket: 'not-a-project.appspot.com'
      },
      gmail: {
        email: 'testsender@test.com',
        password: 'testpassword'
      }
    };
  });
  


const test = {
    
    type : "A"
}

const dummyUId = 'gR5L4DBJfHatzDJGwIOW7I9HIzl1';


const initialState = {
    isFetching: true,
    error: '',
    isAuthed: false,
    authedId: '',
  }


const initialUserState = {
    lastUpdated: 0,
    info: {
      name: '',
      uid: '',
    },
    decisionsMade: {},
  }
  
  

describe('initial  user state', () => {
    it('should return the initial state of user', () => {
        expect ( user.user(undefined,{} )).toEqual({
            lastUpdated: 0,
            info: {
              name: '',
              uid: '',
            },
            decisionsMade: {},
        })
})
    it('should return the initial state of user', () => {
        expect ( user.user(undefined,{} )).not.toEqual({
            lastUpdated: 1,
            info: {
            name: '',
            uid: '',
            },
            decisionsMade: {},
        })
    })
})


describe('initial users state', () => {
    it('should return the initial state of users', () => {
        expect ( user.default( undefined,{})).toEqual({
            isFetching: true,
            error: '',
            isAuthed: false,
            authedId: '',
        }
    )
})
})

describe('login user', ()=> {
    it('should loginUser',() =>{
        expect(user.authUser(dummyUId)).toEqual({
           
            type: "AUTH_USER",
            uid : dummyUId

        })

        
    })
})

describe('addUserDummy', () => {
    it('should add a user ')
})
