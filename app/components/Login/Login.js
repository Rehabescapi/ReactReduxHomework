import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { login, resetPassword } from 'helpers/auth'
import { form ,container,  input, button} from './styles.css'
function setErrorMsg (error) {
  return {
    loginMessage: error,
  }
}


export default class Login extends Component {
  state = { loginMessage: null }
  handleSubmit = (e) => {
    const creds = {
      email : this.email.value,
      password : this.pw.value
    }
    e.preventDefault()
    this.props.onAuth(e,'EMAIL_LOGIN',creds )
   
  }
  resetPassword = () => {
    resetPassword(this.email.value)
      .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.email.value}.`)))
      .catch((error) => this.setState(setErrorMsg(`Email address not found.`)))
  }
  render () {
    return (
      <div className={container}>
        <h1> {'Login'} </h1>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label>Email</label>
            <input className='form-control' type='text' ref={(email) => this.email = email} placeholder='Email'/>
          </div>
          <div className='form-group'>
            <label>{'Password'}</label>
            <input type='password' className='form-control' placeholder='Password'
              ref={(pw) => this.pw = pw} />
          </div>
          {
            this.state.loginMessage &&
            <div className='alert alert-danger' role='alert'>
              <span className='glyphicon glyphicon-exclamation-sign' aria-hidden='true' />
              <span className='sr-only'>{'Error:'}</span>
              &nbsp;{this.state.loginMessage} <a href='#' onClick={this.resetPassword} className='alert-link'>Forgot Password?</a>
            </div>
          }
          <button type='submit' className='btn btn-primary'>{'Login'}</button>
        </form>

      
      </div>
    )
  }
}

Login.propTypes = {
  onAuth : PropTypes.func.isRequired,
  isFetching : PropTypes.bool,
}