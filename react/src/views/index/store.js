/**
 * @file store
 * @author dongkunshan(windwithfo@yeah.net)
 */

import {
  action,
  configure,
  observable
} from 'mobx';

configure({ enforceActions: true });

class AppStore {
  text = 'home';
  @observable disabled = '';

  @action
  btnCtl = (flag = false) => {
    this.disabled = flag ? 'disabled' : '';
  }
}

const store = new AppStore();

export default store;
