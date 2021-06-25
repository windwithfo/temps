/**
 * @file 详情页
 * @author dongkunshan(windwithfo@yeah.net)
 */

import { Button } from 'antd';
import {
  observer
} from 'mobx-react';
import React from 'react';
import ReactDom from 'react-dom';
import 'styled-jsx/style';
import '../../assets/style/common.scss';
import store from './store';

@observer
class Page extends React.Component {
  render() {
    const { text, disabled, btnCtl } = this.props.store;
    const btnClick = () => {
      btnCtl(true);
      setTimeout(() => {
        btnCtl();
      }, 3000);
    };
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
          <p className="title">Hello World!</p>
          <p>By Emiya</p>
          <p>page say: {text}</p>
          <Button type="primary" onClick={btnClick} disabled={disabled}>点我禁用3秒</Button>
          <style>{`
            .title {
              color: #0ff;
            }
          `}</style>
        </div>
      </div>
    );
  }
}

ReactDom.render(<Page store={store} />, document.getElementById('root'));

