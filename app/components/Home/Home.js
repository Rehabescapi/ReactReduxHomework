import React from 'react'

import {container, title, slogan} from './styles.css'

export default function Home (props) {
  return (
    <div className={container}>
      <p className={title} >{' Would you rather'}</p>
      <p className={slogan}> {'A quick excercise in redux state management and opinion taker'} </p>
    </div>
  )
}
