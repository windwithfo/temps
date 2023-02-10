/**
 * @file 第二页
 * @author dongkunshan(windwithfo@yeah.net)
 */
import 'antd-mobile/es/global'
import '../../assets/style/common.scss'
import React          from 'react'
import { observer }   from 'mobx-react'
import { createRoot } from 'react-dom/client'

@observer
class Page extends React.Component<any, any> {
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
  if (r !== null) {
    return decodeURIComponent(r[2])
  }
  return ''
}

const container = document.getElementById('app')
const root = createRoot(container)
root.render(<Page id={getUrlParam('id')} />)
