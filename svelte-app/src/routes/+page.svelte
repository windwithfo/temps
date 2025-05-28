<script lang="ts">
  import Toast from 'quarkd/lib/toast'
  import { onMount, getContext } from 'svelte'
  import '@quarkd/icons/lib/success'
  // import Marquee from 'svelte-fast-marquee'
  import {
    fethcData, getUrlParams, isIOS, callBridge,
    isClient, copyToClipboard, getFromClipboard, track
  } from '$lib/index'

  let userId = $state(0)
  let totalInvitedUsers = $state(0)
  let remainingCoins = $state(0)
  let totalCoins = $state(0)
  let invitationCode = $state('')
  let codePaste = $state('')
  let showShare = $state(false)
  window.token = getUrlParams('token')
  let token = $state(getContext('token'))
  let toastDom
  let canvasDom
  let speed = $state(0)

  // 根据埋点返回的调用平台不同，映射埋点需要上报的字段名
  const trackEnum = {
    wcfriend: 'wechat',
    wcmoments: 'friend_circle',
    copylink: 'copy_link',
    'copy_link': 'copy_link',
    saveimage: 'download_picture',
    systemshare: 'system_share',
    WeChat: 'wechat',
    wechat: 'wechat',
  }

  // app分享配置
  const shareConfig = {
    // id: '',
    shareConfig: { //分享数据
      image: {
        imageUrl: import.meta.env.MODE !== 'production' ? 'https://web-h5-dev.wenxiaobai.com/share/shareBg.png' : 'https://web-h5.wenxiaobai.com/share/shareBg.png',
        textInfo: {
          content: '',
          color: '#FF1B31'
        },
        // extraInfo: { 
        //   xx: 'xx',
        //   xx: 'xx'
        // }
      },
      web: {
        title: '活动',
        content: '问小白',
        targetUrl: import.meta.env.MODE !== 'production' ? 'https://web-h5-dev.wenxiaobai.com/share.html' : 'https://web-h5.wenxiaobai.com/share.html', // 新增的targetUrl字段
        // extraInfo: {
        //   xx: 'xx',
        //   xx: 'xx'
        // }
      },
      text: {
        content: '',
        // extraInfo: { 
        //   xx: 'xx',
        //   xx: 'xx'
        // }
      },
    },
    shareChannels: [ //弹窗展示的分享渠道
      {
        channel: 'wcfriend',  // 微信好友
        type: 'image' //分享出去的类别，数据从shareConfig-text中取
      },
      {
        channel: 'wcmoments',  // 微信朋友圈
        type: 'image'
      },
      {
        channel: 'copylink',  // 复制
        type: 'web'
      },
      {
        channel: 'saveimage',  // 保存图片
        type: 'image'
      },
      {
        channel: 'systemshare',  // 系统分享
        type: 'web'
      }
    ]
  }

  // 原计划的奖品列表，大于3个的时候左右做成跑马灯，代码已实现先注释掉了。暂时没用，放的固定图片
  let prizeList = []
  // 邀请码使用记录的数据集，默认取top10，二期开发全部页面跳转到allList取实现
  let codeList = $state([])

  // 复制邀请码
  const copyCode = async(e) => {
    e.stopPropagation()
    track('share_code_copy', {
      uid: userId + '' || '0'
    })
    if (isClient) {
      await callBridge('copyToClipboard', invitationCode)
      return
    }

    if (navigator.clipboard) {
      navigator.clipboard.writeText(invitationCode).then(() => {
        if (isClient) {
          Toast.success('复制成功')
          return
        }
        toastDom.setAttribute('show', 'show')
        setTimeout(() => {
          toastDom.removeAttribute('show')
        }, 2000)
      }).catch(() => {
        isClient ? Toast.error('复制失败') : ''
      })
    } else {
      copyToClipboard(invitationCode)
      if (isClient) {
        Toast.success('复制成功')
        return
      }
      toastDom.setAttribute('show', 'show')
      setTimeout(() => {
        toastDom.removeAttribute('show')
      }, 2000)
    }
  }

  // 复制页面地址，但是没有登录功能没啥意义。可以检测在浏览器打开时直接调用短链唤起app和pc客户端
  function copyLink() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(location.href).then(() => {
        toastDom.setAttribute('show', 'show')
        setTimeout(() => {
          toastDom.removeAttribute('show')
        }, 2000)
      }).catch(() => {
        Toast.text('复制失败')
      })
    } else {
      copyToClipboard(location.href)
      toastDom.setAttribute('show', 'show')
      setTimeout(() => {
        toastDom.removeAttribute('show')
      }, 2000)
    }
  }

  // 保存图片，对接pc客户端方法
  // todo 端内打开应该没法直接用canvas做，也实现了一下
  function saveImage() {
    const ctx = canvasDom.getContext('2d')
    // 设置分辨率缩放
    const dpr = window.devicePixelRatio || 1
    canvasDom.width = 300 * dpr;
    canvasDom.height = 400 * dpr;
    canvasDom.style.width = '300px'
    canvasDom.style.height = '400px'
    ctx.scale(dpr, dpr)
    // 绘制图片
    const img = document.createElement('img')
    img.src = '/share/shareBg.png'
    ctx.drawImage(img, 0, 0, 300, 400)
    // 绘制文本
    ctx.font = '38px Arial'
    ctx.textAlign = 'center'
    ctx.fillStyle = 'rgb(255, 27, 49)'
    ctx.fillText(invitationCode, 150, 210)
    // 绘制圆角矩形
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)'
    ctx.beginPath()
    ctx.roundRect(52, 173, 192, 46, 10)
    ctx.stroke()
    // 下载图片
    const dataURL = canvasDom.toDataURL('image/png')
    const downloadLink = document.createElement('a')
    downloadLink.href = dataURL
    downloadLink.download = 'wenxiaobai.png'
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }

  // 分享
  const share = async (type) => {
    console.log('click type ' + type)
    if (type === 'btn') {
      track('share_button_click', {
        uid: userId + '' || '0'
      })
    } else {
      track('share_page_click', {
        uid: userId + '' || '0'
      })
    }
    
    showShare = true
    if (isClient) {
      // use bridge to share
      const res = await callBridge('outerShare', shareConfig)
      console.log('分享配置', shareConfig)
      showShare = false
      console.log('分享结果', res)
      track('share_code_method', {
        uid: userId + '' || '0',
        action: res.data.platform ? trackEnum[res.data.platform] : 'noaction' 
      })
      if (res.data.platform !== 'copylink' && res.data.platform !== 'copy_link' && res.data.platform !== 'saveimage') {
        switch (res.data.code) {
          case 0:
            Toast.success('分享成功')
            break;
          case 1:
            Toast.error('分享失败')
            break;
          case 2:
            Toast.warning('版本不支持')
            break;
        }
      }
      return
    }
    // use h5 to share
    console.log('share code')
  }

  // 粘贴
  const paste = async () => {
    track('share_code_paste', {
      uid: userId + '' || '0'
    })
    let text = ''
    if (isClient) {
      text = (await callBridge('fetchClipboardContent', '')).data || ''
    } else {
      // navigator.clipboard不可用的话暂时没法实现getFromClipboard实现已经用不了，可以替换为toast提示
      text = navigator.clipboard ? (await navigator.clipboard.readText()) : getFromClipboard()
    }
    const regex = /【?(\b\w{6}\b)】?/g
    const matches = regex.exec(text) || ['', '']
    console.log(text, matches)
    codePaste = matches[1]
  }

  // 核销
  function confirm() {
    track('enter_share_code', {
      uid: userId + '' || '0'
    })
    fethcData('/rest/operation/api/invitation/use', {
      code: codePaste,
    }).then((res) => {
      if (res.code == 0 || res.code == 410001) { 
        Toast.success(res.data || res.msg || '')
        // 刷新用户统计数据
        getStats()
        // 获取用户金币获取记录
        getList()
      } else {
        Toast.error(res.data || res.msg || '')
      }
    })
  }

  // 跳转到规则页面
  const goRulePage = () => {
    track('activity_rule_click', {
      uid: userId + '' || '0'
    })
    push('/rule')
  }

  // 返回
  const goBack = () => {
    if (isClient) {
      callBridge('closePage')
      return
    }
    history.back()
  }

  // 获取邀请码使用数据列表
  const getList = () => {
    // 获取用户最近 n 次的金币获取记录
    fethcData('/rest/operation/api/user/stats/latest-coin-acquisitions', '', 'GET').then((res) => {
      console.log('金币获取记录', res)
      if (res.code == 0) {
        codeList = res.data
      }
    }).catch((e) => {
      console.log('获取用户信息列表失败', e)
    })
  }

  // 从端上获取用户信息
  const getUserInfo = () => {
    return new Promise(async (resolve, reject) => {
      if (isClient) {
        try {
          console.log('app内打开，开始获取用户信息')
          // 获取用户信息
          const userInfo = await callBridge('fetchUserInfo')
          console.log('用户信息', userInfo)
          userId = userInfo.data.user.id
          track('activity_page_show', {
            uid: userId + '' || '0'
          })
          resolve()
        } catch (e) {
          console.log('获取设备和用户信息失败', e)
          reject(e)
        }
      } else {
        // web获取用户信息
        console.log('web内打开，跳转登录页')
        if (!token) {
          track('activity_page_show', {
            uid: userId + '' || '0'
          })
          // todo 从pc端获取userid，如果从main.ts那里获取header时候已经获取了这个就不要了
          // 如果没有需要单独开个方法获取，需要注意敏感数据传输的安全性
          // 登录暂时不做了，但是登录组件可以作为后续活动需要的通用组件做一下
          // push('/login')
        }
        reject()
      }
    })
  }

  function fmtTime (time) {
    const date = new Date(time)
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return `${year}-${month > 9 ? month : '0' + month}-${day > 9 ? day : '0' + day} ${hour > 9 ? hour : '0' + hour}:${minute > 9 ? minute : '0' + minute}:${second > 9 ? second : '0' + second}`
  }

  // 获取用户邀请码
  function getCode() {
    fethcData('/rest/operation/api/invitation/code', '', 'GET').then((res) => {
      console.log('获取邀请码', res)
      if (res.code == 0) {
        invitationCode = res.data
        shareConfig.shareConfig.image.textInfo.content = invitationCode
        // todo 差个短链需要替换
        // shareConfig.shareConfig.text.content = `打开问小白，填入我的邀请码【${invitationCode}】使用满血DeepSeek R1，零延迟、不卡、不限次、不收费！{短链接}`
        shareConfig.shareConfig.web.targetUrl = `打开问小白，填入我的邀请码【${invitationCode}】使用满血DeepSeek R1，零延迟、不卡、不限次、不收费！{短链接}`
      } else if (res.code == 400) {
        Toast.error(res.message)
      }
    }).catch((e) => {
      console.log('获取用户邀请码失败', e)
    })
  }

  // 获取用户统计信息
  function getStats() {
    fethcData('/rest/operation/api/user/stats/get', '', 'GET').then((res) => {
      console.log('获取统计信息', res)
      if (res.code == 0) {
        remainingCoins = res.data.remainingCoins
        totalCoins = res.data.totalCoins
        totalInvitedUsers = res.data.totalInvitedUsers
      }
    }).catch((e) => {
      console.log('获取用户统计信息失败', e)
    })
  }

  onMount(async () => {
    // 获取设备信息后再获取用户信息
    try {
      await getUserInfo()
    } catch (error) {
      // return
    }

    // 获取用户邀请码
    getCode()

    // 获取用户统计信息
    getStats()

    // 获取用户金币获取记录
    getList()

    // 客户端内没10秒刷新一次
    if (isClient) {
      // refresh list
      setInterval(() => {
        getList()
        console.log('refresh list')
      }, 10000)
    }

    // 暂时没用到，奖品超过3个时候跑马灯展示，用速度控制是否滚动
    // if (prizeList.length > 3) {
    //   speed = 50
    // }
		console.log('the component has mounted');
	})
</script>

<main>
<div id="home" class="{ !isClient ? 'pc' : ''}">
  <nav>
    <header>
      <button onclick={ () => { goBack() } } aria-label="back"></button>
      <p></p>
      <div>
        <button type="button" onclick={ () => { goRulePage() } }>规则</button>
        <button type="button" onclick={ () => { share('icon') } } aria-label="share"></button>
      </div>
    </header>
  </nav>

  <div class="banner"></div>

  <section class="prize">
    <h1>当前持有抽奖券&nbsp;{ remainingCoins }&nbsp;张</h1>
    <h2>满1张抽奖券可抽一次，当前中奖概率 &nbsp;{ Math.floor(remainingCoins) } &nbsp;倍</h2>
    <h2>开奖日期：2025年3月1日</h2>
    <div>
      <div></div>
      <h2>奖品展示</h2>
      <div></div>
    </div>
    <div class="prizeList">
      <!-- <Marquee speed={ speed }>
        <ul>
          {#each prizeList as item}
          <li class="prizeItem">
            <div>
              <img src={ item.img } alt="prize" width="100%">
            </div>
            <p>{ item.text }</p>
          </li>
          {/each}
        </ul>
      </Marquee> -->
      <img src="/share/prize1.png" alt="prize1" width="100%">
      <img src="/share/prize2.png" alt="prize2" width="100%">
      <img src="/share/prize3.png" alt="prize3" width="100%">
    </div>
    <p>*奖品图片仅供参考，具体以实物为准</p>
  </section>

  <section class="myInfo">
    <p>我的分享码</p>
    <div>
      <div>{ invitationCode }</div>
      <button onclick={ copyCode }>复制分享码</button>
      <button onclick={ () => { share('btn')} }>分享</button>
    </div>
    <div></div>
    <h2>已邀请&nbsp; <span>{ totalInvitedUsers }</span> &nbsp;个用户，总计已获得&nbsp; <span>{ totalCoins }</span> &nbsp;奖券</h2>
    <div class="rule">
      <h2>规则说明</h2>
      <h3>分享邀请码奖励</h3>
      <p><span>1.</span><span>每当其他用户成功填写您的邀请码，可获得 1张抽奖券，每日最多奖励5次</span></p>
      <p><span>2.</span><span>您的邀请码被他人首次成功填写时，额外奖励10张抽奖券，该奖励仅限1次</span></p>
      <p><span>3.</span><span>若新用户首次成功填写您的邀请码，可额外获得10张抽奖券，不设次数限制</span></p>
      <p><span>4.</span><span>当邀请码的填写次数超过当日奖励上限时，将不再发放新的奖励</span></p>
      <h3>填写邀请码奖励</h3>
      <p><span>1.</span><span>成功填写邀请码后，可获得1张抽奖券，每日最多奖励5次</span></p>
      <p><span>2.</span><span>作为新用户，首次成功填写邀请码时，可额外奖励10张抽奖券，该奖励仅限1次</span></p>
      <p><span>3.</span><span>当当日抽奖券的奖励上限已达，若填写邀请码则显示失败，您可在次日尝试重新填写</span></p>
      <h3>说明</h3>
      <p><span>1.</span><span>新用户指于活动开始后（xxxx年xx月xx日 xx:xx）首次注册的用户</span></p>
      <p><span>2.</span><span>每日奖励次数限制将在每日0点自动重置</span></p>
      {#if isIOS()}
        <h3>本活动与苹果公司无关</h3>
      {/if}
    </div>
  </section>

  <section class="shareCode">
    <p>输入好友分享码</p>
    <div>
      <div>
        <input type="text" placeholder="输入好友邀请码" bind:value={ codePaste } maxlength="6"
          onkeyup={ (e) => { codePaste = e.target.value.replace(/[^a-zA-Z0-9]/g, '') } }
          class="{ codePaste.length > 0 ? 'text' : '' }"
        />
        <button class="codeBtn" onclick={ paste }>粘贴分享码</button>
      </div>
      <button onclick={ confirm }>确认</button>
    </div>
  </section>

  <div class="prizeDetail">
  <div></div>
  <h2>奖券明细</h2>
  <div></div>
  </div>

  <section class="codeList">
    <ul>
      {#each codeList as item}
      <li class="codeItem">
        <div class="left">
          <p>{ item.businessInfo }
          {#if item.acquireType == 2}
            <span>（新用户首次）</span>
          {:else if item.acquireType == 5}
            <span>（新用户首次）</span>
          {:else if item.acquireType == 3}
            <span>（邀请码首次被填写）</span>
          {/if}
          </p>
          <p>{ fmtTime(item.createTime) }</p>
        </div>
        <p>+{ item.coinAmount }</p>
      </li>
      {/each}
    </ul>
  </section>

  <div class="share"
    style="display: { showShare ? 'block' : 'none' }"
    onclick={ () => { showShare = false } }
    onkeydown={ (e) => { if (e.key === 'Enter' || e.key === ' ') { showShare = false } } }
    role="button"
    tabindex="0">
    <!-- 蒙层 -->
    <div></div>
    <!-- 邀请码 -->
    <div style="display: { !isClient ? 'block' : 'none' }">
      <div class="invitationCode">{ invitationCode }</div>
      <div class="shareBtns">
        <button onclick={ copyCode }>复制分享码</button>
        <button onclick={ saveImage }>下载图片到本地</button>
        <button onclick={ copyLink }>复制网址链接</button>
      </div>
    </div>
  </div>
  <quark-toast class="qtoast" type="text" bind:this={ toastDom }>
    <div><span><quark-icon-success size="20"></quark-icon-success></span><p>已复制，快去分享给好友吧！</p></div>
  </quark-toast>
  <canvas bind:this={ canvasDom } style="display: none;"></canvas>
</div>
</main>

<style lang="scss">
  main {
    width: 390px;
    min-height: 100vh;
    margin: 0 auto;
  }

  .pc {
    nav {
      height: 46px !important;
      
      header {
        top: 0px !important;
      }
    }

    .banner {
      height: 153px !important;
      background-position-y: -54px !important;
    }
  }

  #home {
    padding-bottom: 95px;

    button {
      cursor: pointer;
      outline: none;

      &:focus {
        outline: none;
      }
    }

    nav {
      position: fixed;
      top: 0px;
      z-index: 10;
      width: 370px;
      height: 100px;
      background-image: url('/share/banner.png');
      background-size: cover;
      padding: 0 10px;

      header {
        position: relative;
        top: 54px;
        display: flex;
        height: 46px;
        align-items: center;
        justify-content: space-between;

        &>:nth-child(1) {
          width: 90px;
          border: none;
          height: 36px;
          background-color: transparent;
          background-image: url('/share/back.png');
          background-repeat: no-repeat;
          background-size: 36px;
        }

        &>:nth-child(2) {
          font-size: 17px;
          color: #fff;
          font-weight: bold;
          line-height: 23.8px;
        }

        &>:nth-child(3) {
          text-align: right;
          width: 90px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          &>:first-child {
            width: 46px;
            height: 24px;
            background: rgba($color: #000, $alpha: 0.1);
            border: none;
            border-radius: 16px;
            font-size: 12px;
            line-height: 22px;
            font-weight: 500;
            color: #fff;
          }

          &>:last-child {
            width: 36px;
            height: 36px;
            border: none;
            background-color: transparent;
            background-image: url('/share/share.png');
            background-size: contain;
          }
        }
      }
    }

    .banner {
      width: 390px;
      height: 207px;
      background-image: url('/share/banner.png');
      background-size: cover;
    }

    .prize {
      width: 358px;
      background-color: #fff;
      border-radius: 16px;
      margin-left: 16px;
      margin-bottom: 18px;
      position: relative;
      padding: 0 16px;
      box-sizing: border-box;

      &>:nth-child(1) {
        font-size: 20px;
        font-weight: 600;
        line-height: 22px;
        color: #DF0021;
        padding-top: 24px;
      }

      &>:nth-child(2) {
        font-size: 12px;
        font-weight: 500;
        line-height: 22px;
        color: #DF0021;
        opacity: 0.6;
        padding-top: 6px;
      }

      &>:nth-child(3) {
        font-size: 14px;
        font-weight: 600;
        line-height: 22px;
        color: #000;
        padding-top: 12px;
      }

      &>:nth-child(4) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 16px;
  
        div {
          width: 132px;
          background-color:#000;
          opacity: 0.05;
          height: 1.2px;
        }
  
        h2 {
          font-size: 12px;
          font-weight: 600;
          line-height: 22px;
          color: #000;
          opacity: 0.3;
        }
      }

      .prizeList {
        img {
          display: block;
          margin-bottom: 13px;
        }
      }

      

      &>:last-child {
        color: #000;
        opacity: 0.3;
        font-size: 10px;
        line-height: 10px;
        padding-bottom: 19px;
      }
    }

    .myInfo {
      width: 358px;
      background-color: #fff;
      border-radius: 16px;
      margin-left: 16px;
      margin-bottom: 18px;
      position: relative;
      text-align: left;
      padding: 12px 16px;
      box-sizing: border-box;

      &>:nth-child(1) {
        font-size: 14px;
        font-weight: 600;
        line-height: 22px;
        color: #C62C43;
      }

      &>:nth-child(2) {
        display: flex;
        height: 36px;
        padding-top: 8px;
        justify-content: space-between;
        align-items: center;

        &>:nth-child(1) {
          width: 115px;
          color: #000;
          font-weight: 900;
          font-size: 32px;
          line-height: 22px;
          color: #FF0018
        }

        &>:nth-child(2) {
          width: 106px;
          height: 36px;
          background: linear-gradient(90deg, #8438FF 0%, #A537FF 100%);
          border: none;
          border-radius: 26.5px;
          font-size: 14px;
          font-weight: 600;
          line-height: 22px;
          color: #fff;
          margin-left: 35px;
        }

        &>:nth-child(3) {
          width: 64px;
          height: 36px;
          background: linear-gradient(90deg, #FF1410 0%, #FF0066 100%);
          border: none;
          border-radius: 26.5px;
          font-size: 14px;
          font-weight: 600;
          line-height: 22px;
          color: #fff;
          margin-left: 8px;
        }
      }

      &>:nth-child(3) {
        height: 1px;
        background-color: #000;
        opacity: 0.08;
        margin-top: 12px;
      }

      &>:nth-child(4) {
        font-size: 14px;
        font-weight: 500;
        line-height: 22px;
        color: #000;
        margin-top: 8px;

        span {
          color: #C62C43;
        }
      }

      .rule {
        background-color: rgba($color: #FF002714, $alpha: 0.08);
        width: 326px;
        border-radius: 12px;
        color: #000;
        margin-top: 17px;
        box-sizing: border-box;
        padding: 10px 12px;

        h2 {
          font-size: 14px;
          font-weight: 600;
          line-height: 22px;
          color: #C62C43;
        }

        h3 {
          font-size: 12px;
          font-weight: 500;
          line-height: 22px;
          color: #000;
          opacity: 0.75;
        }

        p {
          font-size: 12px;
          line-height: 22px;
          color: #000;
          opacity: 0.75;
          display: flex;

          &>:first-child {
            margin: 0 2px 0 8px;
          }
        }
      }
    }

    .shareCode {
      width: 358px;
      height: 106px;
      background-color: #fff;
      border-radius: 16px;
      margin-left: 16px;
      position: relative;
      padding: 12px 16px;
      box-sizing: border-box;
      text-align: left;

      &>:nth-child(1) {
        font-size: 14px;
        font-weight: 600;
        line-height: 22px;
        color: #C62C43;
      }

      &>:nth-child(2) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 6px;

        div {
          width: 254px;
          height: 48px;
          background: #0000000D;
          border: #FF1D61 2px solid;
          border-radius: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 8px;

          input {
            width: 98px;
            font-size: 14px;
            line-height: 22px;
            background: none;
            border: none;
            color: #000;

            &:focus {
              outline: none;
            }
          }

          .text {
            font-size: 24px;
            font-weight: 600;
          }

          button {
            width: 106px;
            height: 36px;
            background: linear-gradient(90deg, #8438FF 0%, #A537FF 100%);
            border: none;
            border-radius: 26.5px;
            font-size: 14px;
            font-weight: 600;
            line-height: 22px;
            color: #fff;
          }
        }

        button {
          width: 64px;
          height: 36px;
          background: linear-gradient(90deg, #FF1410 0%, #FF0066 100%);
          border: none;
          border-radius: 26.5px;
          font-size: 14px;
          font-weight: 600;
          line-height: 22px;
          color: #fff;
          margin-left: 8px;
        }
      }
    }

    .prizeDetail {
      width: 390px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 24px;
      margin-bottom: 12px;
      padding: 0 16px;

      div {
        width: 139px;
        background-color: #fff;
        opacity: 0.2;
        height: 1.2px;
      }

      h2 {
        font-size: 14px;
        line-height: 22px;
        color: #fff;
      }
    }

    .codeList {
      .codeItem {
        width: 358px;
        background-color: #fff;
        border-radius: 16px;
        margin-left: 16px;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        box-sizing: border-box;
        margin-bottom: 8px;

        .left {
          width: 277px;
          text-align: left;

          &>:nth-child(1) {
            font-size: 15px;
            font-weight: 600;
            line-height: 21px;
            color: #000;
            padding-bottom: 6px;

            span {
              color: #FF4955;
            }
          }

          &>:nth-child(2) {
            font-size: 13px;
            line-height: 15px;
            color: #000;
            opacity: 0.4;
          }
        }

        &>:nth-child(2) {
          font-size: 15px;
          font-weight: 500;
          line-height: 17.58px;
          color: #FF1021;
        }
      }
    }

    .share {
      position: fixed;
      top: 0;
      z-index: 20;
      width: 390px;
      height: 100vh;
      background-color: red;

      &>:nth-child(1) {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: 0.75;
      }

      &>:nth-child(2) {
        position: relative;
        top: 143px;
        width: 342Px;
        height: 456Px;
        margin: 0 auto;
        background-image: url('/share/shareBg.png');
        background-size: contain;

        .invitationCode {
          position: relative;
          top: 195Px;
          margin: 0 auto;
          width: 226Px;
          height: 53Px;
          font-size: 40Px;
          line-height: 53Px;
          font-weight: 900;
          font-family: Roboto;
          color: #FF1B31;
          border: rgba($color: #000, $alpha: 0.08) 1.14px solid;
          border-radius: 13.86px;
        }

        .shareBtns {
          position: absolute;
          bottom: -197Px;

          &>:nth-child(1) {
            color: #fff;
            background-color: #8D3FFF;
          }

          button {
            width: 284Px;
            height: 48Px;
            color: #000;
            line-height: 22Px;
            font-size: 15Px;
            font-weight: 500;
            background-color: #fff;
            border: 1px transparent solid;
            border-radius: 24Px;
            margin-bottom: 12Px;
          }
        }
      }
    }

    .qtoast{
      div {
        display: flex;
      }

      span {
        background-color: #88DB4D;
        width: 24Px;
        height: 24Px;
        line-height: 24Px;
        border-radius: 12Px;
        display: block;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      p {
        font-size: 16Px;
        font-weight: 500;
        line-height: 22Px;
        margin-left: 5Px;
      }
    }
  }
</style>
