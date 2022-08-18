import React from 'react'
import { NavLink } from 'react-router-dom'

function MeunBar() {
  return (
    <>
      <ul>
        <li>
          <NavLink to={'/'}>Home</NavLink>
        </li>
        <li>
          <NavLink to={'/school'}>School</NavLink>
        </li>
        <li>
          <NavLink to={'/student'}>Studnet</NavLink>
        </li>
        <li>
          <NavLink to={'/teacher'}>Teacher</NavLink>
        </li>
      </ul>
    </>
  )
}

export default MeunBar
