/**
 * @file Loader
 * @author dongkunshan(windwithfo@yeah.net)
 */

import React from 'react'

const TextComponent = () => {
  return (<div className='title'>
    <span className='txt'>test text</span>
    <style>{`
      .title {
        span {
          color: #00f;
        }
      }
    `}</style>
  </div>)
}

export default TextComponent
