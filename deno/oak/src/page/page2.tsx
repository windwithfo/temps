/**
 * @file 第二页
 * @author dongkunshan(windwithfo@yeah.net)
 */

import { getUrlParam } from '../utils.ts'
import { React }       from '../../deps.ts'

function Page2(route: any) {
  const { name } = route.match.params
  const id = getUrlParam('id', route.location.search)

  return (
    <div className="page2">
      <p className="title">Hello World!</p>
      <p>page say: page2 {name} id is {id}</p>
      <style>{`
        .title {
          color: #0ff;
        }
      `}</style>
    </div>
  )
}

export default Page2
