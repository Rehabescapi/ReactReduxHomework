import React from 'react'
import PropTypes from 'prop-types'
import { FacebookAuthButton, Form} from 'components'
import { centeredContainer, largeHeader, errorMsg} from 'shared/styles.css'

export default function Authenticate ({isFetching, error, onAuth}) {
  const FacebookAuthentication = true
  const FormAuthentication = false
  console.log(isFetching)
  return (
    <div className = {centeredContainer} >
      <h1 className = {largeHeader}> Authenticate </h1>
      {FacebookAuthentication &&
            <FacebookAuthButton
              isFetching = {isFetching}
              onAuth= {onAuth}/>}

      {error && <p className={errorMsg}> {error} </p>}

    </div>
  )
}

Authenticate.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  onAuth: PropTypes.func.isRequired,
}
