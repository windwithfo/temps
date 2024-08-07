/**
 * @file store
 * @author dongkunshan(windwithfo@yeah.net)
 */

import React     from 'react'
import Page1     from './page1.tsx'
import Page2     from './page2.tsx'
import { Route } from 'react-router'

function getRoutes() {
  return (
    <div className="route">
      <Route path='/' exact component={Page1}></Route>
      <Route path='/page1' exact component={Page1}></Route>
      <Route path='/page2/:name' exact component={Page2}></Route>
    </div>
  )
}

export default getRoutes
