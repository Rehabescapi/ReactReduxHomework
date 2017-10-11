
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { container, navContainer, link } from './styles.css'
import { ModalContainer } from 'containers'

Navigation.propTypes = NavLinks.propTypes = ActionLinks.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
}
export default function Navigation (isAuthed){
    console.log(isAuthed)
   return (
      <div className={container}>
        <nav className={navContainer}>
              <NavLinks isAuthed={isAuthed.isAuthed}/>
              <ActionLinks isAuthed={isAuthed.isAuthed}/>
        </nav>
    </div>
   )
}


function NavLinks ({isAuthed}){
    return isAuthed=== true
    ?<ul>
        <li> <Link className={link} to='/'> Home </Link></li>
        </ul>
        :null
}

function ActionLinks({isAuthed}){
    return isAuthed === true ? 
    <ul>
        <li></li>
        <li><Link className= {link} to='/logout'>{'Logout'} </Link></li>
    </ul>
    :<ul>
    <li><Link className={link} to='/'>{'Home'} </Link></li>
    <li><Link className={link} to='/login'>{'Login'} </Link></li>
</ul>
}