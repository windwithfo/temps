/**
 * @file 第二页
 * @author dongkunshan(windwithfo@yeah.net)
 */

import { getUrlParam }                   from '../utils.ts'
import { React, useParams, useLocation } from '../../deps.ts'

function Page2 () {
  let { name } = useParams()
  let location = useLocation()

  function handleClick() {
    console.log('click')
  }

  return (
    <div className="page2">
      <p className="title">Hello World!</p>
      <p>page say: page2 {name} id is {getUrlParam('id', location.search)}</p>
      <button onClick={handleClick}>btn</button>
      <style>{`
        .title {
          color: #ff0;
        }
      `}</style>
    </div>
  )
}

export default Page2
