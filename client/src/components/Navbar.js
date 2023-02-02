import React, { useContext } from 'react'
import { NavLink, useNavigate  } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {
    const history = useNavigate()
    const auth = useContext(AuthContext);

    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
        history.push('/');
    }

  return (
    <nav>
    <div className="nav-wrapper grey darken-3" style={{ padding: '0 2rem' }}>
      <span href="/" className="brand-logo">Link shortening</span>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><NavLink to='/create'>Create</NavLink></li>
        <li><NavLink to='/links'>Links</NavLink></li>
        <li><a href='/' onClick={logoutHandler}>Exit</a></li>
      </ul>
    </div>
  </nav>
  )
}
