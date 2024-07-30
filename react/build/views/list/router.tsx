/**
 * @file 路由配置
 * @author dongkunshan(windwithfo@yeah.net)
 */

import Home   from './home'
import Nav    from 'component/Nav'
import Loader from 'component/Loader'
import React,
{
  lazy, Suspense
} from 'react'
import {
  createHashRouter,
  redirect,
  Navigate
} from 'react-router-dom'

const Page1 = lazy(() => import('./page1'))
const Page2 = lazy(() => import('./page2'))

const router = createHashRouter([
  {
    path: '/',
    element: <><Nav /><Navigate to='/home' replace/></>,
    loader: async () => {
      await redirect('/home')
      return null
    },
    children: [
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/page1',
        element: <Suspense fallback={Loader({isLoading: true, error: ''})}><Page1 /></Suspense> 
      },
      {
        path: '/page2',
        element: <Suspense fallback={Loader({isLoading: true, error: ''})}><Page2 /></Suspense> ,
      }
    ]
  }
])

export default router
