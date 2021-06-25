/**
 * @file 第二页
 * @author dongkunshan(windwithfo@yeah.net)
 */

import {
  observer
} from 'mobx-react'
import React from 'react'
import ReactDom from 'react-dom'
import 'styled-jsx/style'
import '../../assets/style/common.scss'

@observer
class Page extends React.Component {
  render() {
    const id = this.props.id

    return (
      <div className="nav">
        <ul>
          <li>
            <a href="index.html">
              Home
            </a>
          </li>
          <li>
            <a href="page1.html">
              Page1
            </a>
          </li>
          <li>
            <a className="active" href="page2.html?id=123">
              Page2
            </a>
          </li>
        </ul>
        <div className="page2">
          <p className="title">Hello World!</p>
          <p>By Emiya</p>
          <p>page say: page2</p>
          <p>id is: {id}</p>

          <style>{`
            .title {
              color: #ff0;
            }
          `}</style>
        </div>
      </div>
    )
  }
}

function getUrlParam(name, source = '') {
  let _source = source
  const reg = new RegExp(`(^|[&,?])${name}=([^&]*)(&|$)`, 'i')

  if (!source) {
    _source = window.location.search.substr(1)
  }
  const r = _source.match(reg)
  if (r != null) {
    return decodeURIComponent(r[2])
  }
  return ''
}

ReactDom.render(<Page id={getUrlParam('id')} />, document.getElementById('root'))
