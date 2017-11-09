import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { emailAuth } from 'helpers/auth'

import { form ,container,  input, button} from './styles.css'


function setErrorMsg (error) {
  return {
    registerError: error.message,
  }
}

export default class Register extends Component {
  constructor(props){
    super(props)
  }
  state = { registerError: null }
  handleSubmit = (e) => {
    e.preventDefault()
    const creds = {
      email : this.email.value,
      password : this.pw.value,
      username : this.username.value
    }
   
    this.props.onAuth(e, 'EMAIL_AUTH' , creds )
   // emailAuth(this.email.value, this.pw.value)
     
  }
  render () {
    return (
      <div className={container}>
        <h1>{'Register'}</h1>
        <form onSubmit={this.handleSubmit}>
        <div className='form-group'>
            <label>{'Username'}</label>
            <input className='form-control' type = 'text' ref={(username) => this.username = username} placeholder='Username'/>
          </div>
          <div className='form-group'>
            <label>{'Email'}</label>
            <input className='form-control' type = 'text' ref={(email) => this.email = email} placeholder='Email'/>
          </div>
          <div className='form-group'>
            <label>{'Password'}</label>
            <input type='password' className='form-control' placeholder='Password'
              ref={(pw) => this.pw = pw} />
          </div>
          {
            this.state.registerError &&
            <div className='alert alert-danger' role='alert'>
              <span className='glyphicon glyphicon-exclamation-sign' aria-hidden='true' />
              <span className='sr-only'>Error:</span>
              &nbsp;{this.state.registerError}
            </div>
          }
          <button type='submit' className='btn btn-primary'>{'Register'}</button>
        </form>
      </div>
    )
  }
}


Register.propTypes = {
  onAuth : PropTypes.func.isRequired,
  isFetching : PropTypes.bool,
}