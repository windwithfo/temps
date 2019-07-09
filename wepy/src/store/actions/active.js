import { FETCH_LIST } from '../types/active'
import { createAction } from 'redux-actions'

export const fetchList = createAction(FETCH_LIST, () => {
  return new Promise(resolve => {
    const data = [{
        img: 'http://resource.aixuexi.com/1500961723749/7.png',
        title: 'title',
        name: 'A机构',
        count: 5
      },
      {
        img: 'http://resource.aixuexi.com/1500961723749/7.png',
        title: 'title2',
        name: 'B机构',
        count: 51
      }
    ]
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })
})
