/**
 * @file store
 * @author dongkunshan(windwithfo@yeah.net)
 */

import {
  action,
  configure, makeAutoObservable, observable
} from 'mobx';

configure({ enforceActions: true })

class AppStore {
  constructor() {
    makeAutoObservable(this)
  }

  text = 'home';
  @observable disabled = false

  @action
  btnCtl = (flag = false) => {
    this.disabled = flag
  }
}

const store = new AppStore()

export default store
