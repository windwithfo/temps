/**
 * @file page1 store
 * @author dongkunshan(windwithfo@yeah.net)
 */

import axios from 'axios';
import {
  action,
  observable,
  runInAction
} from 'mobx';

class Page1Store {
  text = 'Hello World!'
  @observable msg = 'page1'

  @action.bound
  async fetchData() {
    let ret = {
      data: {
        env: ''
      }
    }
    try {
      ret = await axios('/api/home.json')
      runInAction(() => {
        this.msg = ret.data.env;
      });
      return ret
    }
    catch (error) {
      console.log(error);
    }
    return ret
  }

  @action.bound
  async init() {
    let ret = {
      data: {
        env: ''
      }
    }
    try {
      ret = await axios('/api/home.json')
      runInAction(() => {
        this.msg = ret.data.env
      });
      return ret
    }
    catch (error) {
      console.log(error)
    }
    return ret
  }
}

const store = new Page1Store()

export default store
