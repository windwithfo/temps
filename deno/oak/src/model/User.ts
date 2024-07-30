/**
 * @file 服务入口文件
 * @author dongkunshan(dongkunshan210816@credithc.com)
 */

import { Bson } from 'mongo'
import { db }   from './dbHelper.ts'

// Defining schema interface
interface UserSchema {
  _id: Bson.ObjectId;
  userName: string;
  passWord: string;
  state: number;
  roles: Array<string>;
}

const users = db.collection<UserSchema>('users')

export default users
