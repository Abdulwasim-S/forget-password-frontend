import React from 'react'
import HeaderPage from './HeaderPage'
import { NavLink } from 'react-router-dom'

const Loggedinpage = () => {
  return (
    <div>
      <HeaderPage/>
      <h3 className='mt-5'>You have Successfully LoggedIn</h3>
      <NavLink to='/'>Click here to login page</NavLink>
    </div>
  )
}

export default Loggedinpage