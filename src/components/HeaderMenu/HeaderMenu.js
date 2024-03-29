import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import AuthContext from '../../context/AuthContext'

import './HeaderMenu.scss'

const HeaderMenu = () => {
  const auth = useContext(AuthContext)

  return (
    <div className="header-menu">
      <NavLink to="/" exact>
        HOME
      </NavLink>
      {auth.isLoggedIn && (
        <NavLink to={`/${auth.userId}/ventures`}>MY VENTURES</NavLink>
      )}
      {auth.isLoggedIn && <NavLink to="/ventures/new">ADD VENTURE</NavLink>}
      {!auth.isChecking && !auth.isLoggedIn && (
        <NavLink to="/auth">AUTHENTICATE</NavLink>
      )}
      {auth.isLoggedIn && <button onClick={auth.logout}>LOG OUT</button>}
    </div>
  )
}

export default HeaderMenu
