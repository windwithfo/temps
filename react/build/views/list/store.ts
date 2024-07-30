/**
 * @file store
 * @author dongkunshan(windwithfo@yeah.net)
 */

import axios from 'axios'

import {
  action, runInAction,
  configure, makeAutoObservable, observable,
} from 'mobx'
import React from 'react'

configure({ enforceActions: 'always' })

class AppStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  text = 'home'
  @observable disabled = false
  @observable msg = 'page1'

  @action
  btnCtl = (flag = false) => {
    this.disabled = flag
  }

  @action
  async fetchData() {
    let ret: any = {
      data: {
        msg: ''
      }
    }
    try {
      ret = await axios('/mock/test.json')
      runInAction(() => {
        this.msg = ret.data.msg
      })
      return ret
    }
    catch (error) {
      console.log(error)
    }
    return ret
  }

  @action
  async init() {
    let ret: any = {
      data: {
        msg: ''
      }
    }
    try {
      ret = await axios('/mock/test.json')
      runInAction(() => {
        this.msg = ret.data.msg
      })
      return ret
    }
    catch (error) {
      console.log(error)
    }
    return ret
  }
}

const store = new AppStore()

const context = React.createContext(store)

export const useStore = () => React.useContext(context)
