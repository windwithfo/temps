/**
 * @file 第一页
 * @author dongkunshan(windwithfo@yeah.net)
 */

import { Button }        from 'antd'
import React        from 'react'
import { useStore } from './store'
import { observer } from 'mobx-react-lite'

const Page1 = () => {
  const store = useStore()
  const { text, msg, fetchData } = store

  const fetchMsg = () => {
    fetchData()
  }

  return (
    <div className="page1">
      <p className="title">{text}</p>
      <p>By Emiya</p>
      <p>page say: {msg}</p>
      <Button type="primary" onClick={fetchMsg}>getMsg</Button>
      <style>
      {`
        .title {
          color: #f0f;
        }
      `}
      </style>
    </div>
  )
}

export default observer(Page1)
