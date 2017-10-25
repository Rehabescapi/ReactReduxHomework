import React from 'react'

import {container, title, slogan} from './styles.css'

export default function Home (props) {
  return (
    <div className={container}>
      <p className={title} >{' Would you rather'}</p>
      <p className={slogan}> {'yada yada classics yo'} </p>
    </div>
  )
}
