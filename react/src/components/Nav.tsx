/**
 * @file Loader
 * @author dongkunshan(windwithfo@yeah.net)
 */

import React       from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const NavComponent = () => {
  return (
    <div className="nav">
        <ul>
          <li>
            <NavLink className={({isActive})=> isActive ? 'active': ''} to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink className={({isActive})=> isActive ? 'active': ''} to="/page1">Page1</NavLink>
          </li>
          <li>
            <NavLink className={({isActive})=> isActive ? 'active': ''} to="/page2?id=123">Page2</NavLink>
          </li>
        </ul>
        <Outlet />
      <style>
      {`
        .title {
          span {
            color: #00f;
          }
        }
      `}
      </style>
    </div>)
}

export default NavComponent
