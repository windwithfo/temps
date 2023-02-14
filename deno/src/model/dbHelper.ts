/**
 * @file 服务入口文件
 * @author dongkunshan(dongkunshan210816@credithc.com)
 */

import { MongoClient } from '../../deps.ts'

const client = new MongoClient()
 
// Connecting to a Mongo Atlas Database
// client.connect({
//   db: 'dks',
//   // tls: true,
//   servers: [
//     {
//       host: 'www.dongkunshan.cn',
//       port: 19861,
//     },
//   ],
//   credential: {
//     username: 'md',
//     password: '1qazxsw2',
//     db: 'dks',
//     mechanism: 'SCRAM-SHA-1',
//   },
// })

await client.connect('mongodb://dev1:123_dev-456@10.150.31.76:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=agreement_dev&authMechanism=SCRAM-SHA-1&3t.uriVersion=3&3t.connection.name=dev1&3t.alwaysShowAuthDB=true&3t.alwaysShowDBFromUserRole=true')

export const db = client.database('agreement_dev')

export const helper = {
  async add(model: any, data: any, text: string = '') {
    let ret: any = {}
    try {
      ret = await model.insertOne(data)
    } catch (error) {
      ret.message = `新增${text}数据据失败`
      ret.reason = error
    }
    return ret
  },
  async update(model: any, data: any, text: string = '') {
    let ret: any = {}
    const _id = data._id
    delete data._id
    try {
      ret = await model.updateOne({
        _id,
      }, data)
    } catch (error) {
      ret.message = `更新${text}数据据失败`
      ret.reason = error
      ret.modifiedCount = 0
    }
    return ret
  },
  async delete(model: any, data: any, text: string = '') {
    let ret: any = {}
    try {
      ret = await model.deleteMany({
        _id: {
          $in: data.ids
        }
      })
    } catch (error) {
      ret.message = `删除${text}数据据失败`
      ret.reason = error
      ret.deletedCount = 0
    }
    return ret
  },
  async getOne(model: any, data: any, text: string = '') {
    let ret: any = {}
    try {
      ret = await model.findOne(data)
    } catch (error) {
      ret.message = `查询${text}数据失败`
      ret.reason = error
    }
    return ret
  },
  async getAll(model: any, data: any, text: string = '') {
    let ret: any = {}
    try {
      ret = await model.find(data)
    } catch (error) {
      ret.message = `查询${text}数据失败`
      ret.reason = error
    }
    return ret
  },
  async getPage(model: any, data: any, text: string = '') {
    let ret: any = {}
    try {
      ret = await model.aggregate([
        {
          $match: data.query
        },
        {
          $sort: data.sort || { _id: -1 }
        },
        {
          $facet: {
            total: [{$count: 'total'}],
            list: [{
              $skip: (data.pageNum - 1) * data.pageSize
            }, {
              $limit: data.pageSize
            }]
          }
        }
      ])
    } catch (error) {
      ret.message = `查询${text}列表失败`
      ret.reason = error
    }
    return ret
  }
}
