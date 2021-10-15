/**
 * @file Loader
 * @author dongkunshan(windwithfo@yeah.net)
 */

import React from 'react'

const LoadingComponent = ({ isLoading, error }) => {
  // 加载中
  if (isLoading) {
    return <div>Loading...</div>
  }
  // 加载出错
  else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>
  }
  else {
    return null
  }
}

export default LoadingComponent
