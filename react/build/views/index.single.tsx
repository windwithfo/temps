/**
 * @file 详情页
 * @author dongkunshan(windwithfo@yeah.net)
 */
// import 'antd-mobile/es/global'
import '../assets/style/common.scss'
import React              from 'react'
import router             from './router'
import { RouterProvider } from 'react-router-dom'
import { createRoot }     from 'react-dom/client'

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

const container = document.getElementById('app')
const root = createRoot(container)
root.render(<App />)
