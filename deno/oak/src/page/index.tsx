/**
 * @file 服务入口文件
 * @author dongkunshan(dongkunshan210816@credithc.com)
 */

import getRoutes from './router.tsx'
import { Hello } from './components/Hello.tsx'

import {
  React,
  Link,
  StaticRouter,
} from '../../deps.ts'

export const App = (url = '/') => {
  return (
  <StaticRouter location={url} basename="view">
    <Hello />
    <nav>
      <ul>
        <li>
          <Link to="/">Index</Link>
        </li>
        <li>
          <Link to="/page1">Page1</Link>
        </li>
        <li>
          <Link to="/page2/dks?id=123">Page2</Link>
        </li>
      </ul>
    </nav>
    {getRoutes()}
  </StaticRouter>
)}
