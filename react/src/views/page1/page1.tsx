/**
 * @file 第一页
 * @author dongkunshan(windwithfo@yeah.net)
 */

import '../../assets/style/common.scss'
import React        from 'react'
import store        from './store'
import ReactDom     from 'react-dom'
import { observer } from 'mobx-react'

@observer
class Page extends React.Component<any, any> {
  render() {
    const { text, msg } = this.props.store

    return (
      <div className="nav">
        <ul>
          <li>
            <a href="index.html">
              Home
            </a>
          </li>
          <li>
            <a className="active" href="page1.html">
              Page1
            </a>
          </li>
          <li>
            <a href="page2.html?id=123">
              Page2
            </a>
          </li>
        </ul>
        <div className="page1">
          <p className="title">{text}</p>
          <p>By Emiya</p>
          <p>page say: {msg}</p>

          <style>{`
            .title {
              color: #f0f;
            }
          `}</style>
        </div>
      </div>
    )
  }
}

ReactDom.render(<Page store={store} />, document.getElementById('app'))
