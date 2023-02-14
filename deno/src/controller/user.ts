/**
 * @file 服务入口文件
 * @author dongkunshan(dongkunshan210816@credithc.com)
 */

import User       from '../model/User.ts'
import { helper } from '../model/dbHelper.ts'

export function login(userName: string, passWord: string) {
  return helper.getOne(User, { userName, passWord }, '用户')
}
