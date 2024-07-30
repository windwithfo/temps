/**
 * @file 第二页
 * @author dongkunshan(windwithfo@yeah.net)
 */

import React         from 'react'
import { observer }  from 'mobx-react-lite'
import { useSearchParams } from 'react-router-dom'

const Page2 = () => {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')

  return (
    <div className="page2">
      <p className="title">Hello World!</p>
      <p>By Emiya</p>
      <p>page say: page2</p>
      <p>id is: {id}</p>
      <style>
      {`
        .title {
          color: #ff0;
        }
      `}
      </style>
    </div>
  )
}

export default observer(Page2)
