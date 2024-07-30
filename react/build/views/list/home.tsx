/**
 * @file 首页
 * @author dongkunshan(windwithfo@yeah.net)
 */

import { Button }            from 'antd'
import React                 from 'react'
import { useStore }          from './store'
import { Button as Button2 } from 'antd-mobile'
import Text                  from 'component/Text'
import { observer }          from 'mobx-react-lite'
import { useNavigate }       from 'react-router-dom'

const HomePage = () => {
  const store = useStore()
  const nav = useNavigate()
  const { text, disabled, btnCtl } = store

  const btnClick = () => {
    btnCtl(true)
    setTimeout(() => {
      btnCtl()
    }, 3000)
  }

  const goPage2 = () => {
    nav('/page2?id=123')
  }

  return (
    <div className="home">
      <Text/>
      <p className="title">Hello World!</p>
      <p>By Emiya</p>
      <p>page say: {text}</p>
      <Button type="primary" onClick={btnClick} disabled={disabled}>点我禁用3秒</Button>
      <Button2 className='btn2' block color='primary' size='mini' onClick={goPage2}>Btn</Button2>
      <style>
      {`
        .title {
          color: #0ff;
        }
        .btn2 {
          width: 50px;
          height: 30px;
        }
      `}
      </style>
    </div>
  )
}

export default observer(HomePage)
