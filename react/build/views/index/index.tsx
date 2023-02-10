/**
 * @file 详情页
 * @author dongkunshan(windwithfo@yeah.net)
 */
import 'antd-mobile/es/global'
import '../../assets/style/common.scss'
import { Button }            from 'antd'
import React                 from 'react'
import store                 from './store'
import { observer }          from 'mobx-react'
import { Button as Button2 } from 'antd-mobile'
import Text                  from 'component/Text'
import { createRoot }        from 'react-dom/client'

@observer
class Page extends React.Component<any, any> {
  render() {
    const { text, disabled, btnCtl } = this.props.store
    const btnClick = () => {
      btnCtl(true)
      setTimeout(() => {
        btnCtl()
      }, 3000)
    }
    return (
      <div className="nav">
        <ul>
          <li>
            <a className="active" href="index.html">
              Home
            </a>
          </li>
          <li>
            <a href="page1.html">
              Page1
            </a>
          </li>
          <li>
            <a href="page2.html?id=123">
              Page2
            </a>
          </li>
        </ul>
        <div className="home">
          <Text/>
          <p className="title">Hello World!</p>
          <p>By Emiya</p>
          <p>page say: {text}</p>
          <Button type="primary" onClick={btnClick} disabled={disabled}>点我禁用3秒</Button>
          <Button2 block color='primary' size='large'>Block Button</Button2>
          <style>{`
            .title {
              color: #0ff;
            }
          `}</style>
        </div>
      </div>
    )
  }
}

const container = document.getElementById('app')
const root = createRoot(container)
root.render(<Page store={store} />)
