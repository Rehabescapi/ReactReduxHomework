import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
import * as user  from '../modules/user'

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
                email : 'Email',
                password : 'password1'
            }
            console.log(emailProp.password)
        const store = mockStore({ initialUserState })
        store.dispatch(user.fetchAndHandleAuthedUser('FORM_AUTH', emailProp ))
    
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
