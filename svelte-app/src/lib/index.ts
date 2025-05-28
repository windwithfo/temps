// place files you want to import through the `$lib` alias in this folder.
// import MobileDetect from 'mobile-detect'

// const md = new MobileDetect(navigator.userAgent)

// 接口请求地址
const baseUrl = import.meta.env.MODE !== 'production' ? 'https://api-bj-dev.wenxiaobai.com' : 'https://api-bj.wenxiaobai.com'

/**
 * fetch 封装，返回 json 数据 不兼容可替换实现，先用原生fetch
 * @param url {string} 请求地址
 * @param data {obj} 请求参数
 * @returns json
 */
export function fethcData(url, data = {}, method = 'POST') {
  const options = {
    method,
    headers: window.headers || {},
    body: ''
  }

  // options.headers = {"X-Yuanshi-Platform": "android", "x-yuanshi-sm-deviceId": "Bhrl0pUm5oGcYhsu6gz4qcDqSdWq/LzA8JejZiytEER81dWAv32HrUnhJbJNl33PBJDIFcX0ldAbX37fgMaEmMw==", "X-Yuanshi-Oaid": "99e3e68f0845d567cc5d1ec771d941976a3c4befb154cd56531d0bb4cd25d93b", "Accept": "application/json", "X-Yuanshi-Channel": "vivo", "User-Agent": "wanyu/3.3.1/7030301 (Android 34)", "X-Yuanshi-OaidVersion": "2.4.0", "X-Yuanshi-AppVersionName": "3.3.1", "X-Yuanshi-TimeZone": "Asia/Shanghai", "x-yuanshi-deviceId": "9edf7ddb-a378-4988-b62c-eee66080d9fa", "X-Yuanshi-AppVersionCode": "7030301", "X-Yuanshi-AppName": "wanyu", "X-Yuanshi-DeviceMode": "vivo/V2301A", "X-Yuanshi-Is-Oversea": "0", "X-Yuanshi-DeviceOS": "14/34", "x-yuanshi-authorization": "Bearer eyJ6aXAiOiJHWklQIiwiYWxnIjoiSFM1MTIifQ.H4sIAAAAAAAA_y2MUQrDIBBE77LfCm7VqDlHL7DBDUmhVmoSGkrv3rV0vvbt8OYNt22FEcJkvMU86wvhrJ3HQRNnrxkjpdkSRYygYKUNRgzOuDDYISho-yR2O9vG9963JnjuVNqyCtOehalWuflVuxswReu7W5dHYanRmn-wT4iBHVLyTsFEpbC8jIK98fN6Vv4Bl0PUzAd8vsxBk2TEAAAA.QuT7El_BJ6SRdBTplOvDuL6pzFhGJZo-VUWHfrhBZ72Qjw3OmpKjLTeTzotqPeMhj3rsICtt7kuHgjTdcSZSNw}", "Content-Type": "application/json"}
  options.headers = {"Accept": "application/json", "X-Yuanshi-SM-DeviceId": "BSKZKLj6jRpxVz6D7M2IQHSgBU6XKAB6lCngj3clGXvlcOLH260ADJzkNsWVQrq4Y5xXGIm+SvM7rawIbhlzgJg==", "X-Yuanshi-Idfa2": "eyJsYW5ndWFnZSI6InpoLUhhbnMtQ04iLCJzeXNGaWxlVGltZSI6IjE3Mzk1NDAzOTguMDU0MDMzIiwibW50SWQiOiIiLCJkaXNrIjoiMTI3ODcwOTgwMDk2IiwiY2FycmllckluZm8iOiJ1bmtub3duIiwiZGV2aWNlSW5pdFRpbWUiOiIxNjIxMDUzODgwLjcwMzExNzYyNCIsInRpbWVab25lIjoiMjg4MDAiLCJtb2RlbCI6IkQ1M2dBUCIsImJvb3RUaW1lSW5TZWMiOiIxNzQwMzI4MTE5IiwibWVtb3J5IjoiMzg2NjgzNjk5MiIsImNvdW50cnlDb2RlIjoiQ04iLCJkZXZpY2VOYW1lIjoiODY3ZTU3YmQwNjJjNzE2OTk5NWRjMDNjYzA1NDFjMTkiLCJtYWNoaW5lIjoiaVBob25lMTMsMiIsInN5c3RlbVZlcnNpb24iOiIxOC4zLjEifQ==", "X-Yuanshi-DeviceOS": "18.3.1", "X-Yuanshi-Platform": "ios", "X-Yuanshi-AppVersionCode": "202502271145", "X-Yuanshi-Is-Oversea": "0", "X-Yuanshi-DeviceMode": "iPhone 12", "X-Yuanshi-Channel": "appstore", "X-Yuanshi-DeviceId": "51A8F38B-584A-4D1C-98E7-42DFED9770C0", "X-Yuanshi-UA": "Mozilla/5.0 (iPhone; CPU iPhone OS 18_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "Content-Type": "application/json", "X-Yuanshi-AppName": "wanyu", "X-Yuanshi-Idfa2Version": "1.16", "X-Yuanshi-Sign": "d4a45ee25aa488ef507df28ae197a164", "X-Yuanshi-timestamp": "1740643129", "X-Yuanshi-ASAToken": "uxhrJXMiXDucdLB0O4GoXl5nT96AadRguO9/t9URFFkBF3mbNr7axwKhjTTRnl+gu8AzwrZzLyyorbPBcvornU1U8wSXODrv9gAAAUADAAAA5QAAAIDhZU5ASsW/pG0Qd0ErYf7SBrpo6KmbgmRkUBS+v0+P1HKihp38+UHjX3cubpuhlLS83EszdJEbWB0ZTcvzFYdD5C7l7RpVfjZmTem8nMGFjBJZAAjJJY9dRDwfVsLf10pjMrsFY6QFWKbkOfPb6Wy5OPNyZRixpG1Qn6gMUf89KAAAABCVfj3CEL9TM6c5aXnERvGLAAAAnwHpU10v0udW26V8tOqLzrw+Bj3xpgAAAIYGB7ulwstb+oZiUqnwP0Dnz6Fnffc9UGDFglxxcg4M3eHJl6p1EFfuAHlSoTOm4FdRd54QBT7kxmeyJFIcfsE8rdrCz5fKYfDJyaqtnzYVq/w2fCyQV+4cveuaI8YTkTGrOMa2G6o7mMO5QPcx+ReJDm7apl+k8ncrWjbefa5UFZZEk8GuNgEESg4BAA==", "X-Yuanshi-Idfa": "35CE05BD-3E1A-4679-96A5-7A15EEA7F7D7", "X-Yuanshi-Authorization": "Bearer eyJ6aXAiOiJHWklQIiwiYWxnIjoiSFM1MTIifQ.H4sIAAAAAAAA_y2M0Q7CIAxF_6XPIwHGZOw7_IFulGwmIrFjcTH-u8XYp557e_qG277BBLQs3jofVO9iUi76pEIyqMI4LtaliAYTdLDhDpPxTl-cHUbdAddZbD55p3vrmQXPipnXTRhrFMZSZKdXaa63xgXf3LI-Mkltev0f216IYRoMurcdzJgzSST3lel5PQv9gPIhaqQDPl_8l-YzxAAAAA.-FOxHAVWfc9tUbLkAel8hBwSRQ6Us4q-Uu7MoPkLARZ35qJANr-kvDatBYBo0XmbFngmJ8_r7IrN3mcl04y-ag", "X-Yuanshi-ASAInfo": "{\"claimType\":\"Click\",\"clickDate\":\"2025-02-27T06:08Z\",\"attribution\":true,\"countryOrRegion\":\"US\",\"adId\":1234567890,\"keywordId\":12323222,\"orgId\":1234567890,\"campaignId\":1234567890,\"conversionType\":\"Download\",\"adGroupId\":1234567890}", "X-Yuanshi-AppVersionName": "3.4.0", "X-Yuanshi-TimeZone": "Asia/Shanghai"}

  // 接口post不能收json，也不能收FormData，只能收from的字符串，踩坑记录下
  method === 'POST' ? options.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8' : options.headers['Content-Type'] = 'application/json'

  if (method === 'POST') {
    // 处理数据为form字符串，目前没用到json发送
    const body = getData(data, 'form')
    options.body = body
  } else {
    data ? url += '?' + new URLSearchParams(data).toString() : ''
    delete options.body
  }

  return fetch(url.indexOf('http') > -1 ? url : baseUrl + url, options).then((response) => response.json());
}

/**
 * 
 * @param data {obj} 数据源
 * @param mode {stirng} 发送格式
 * @returns 数据结果
 */
function getData(data, mode = 'json') {
  if (mode == 'json') {
    return JSON.stringify(data)
  }
  let payload = ''
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      // form字符串拼接，kv之间不要加任何东西，踩坑记录，多个字符串用&分割
      payload ? payload += `&${key}=${data[key]}` : payload += `${key}=${data[key]}`
    }
  }
  return payload
}

/**
 * 获取url参数
 * @param key {string} 参数名
 * @returns string
 */
export function getUrlParams(key) {
  const search = window.location.search
  const params = new URLSearchParams(search)
  return params.get(key)
}

// 判断是否是ios
export function isIOS() {
  return /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())
}

// 调用app客户端方法封装
export function callBridge(name, data = '') {
  return new Promise((resolve, reject) => {
    console.log('call system ' + name)
    window.JSBridge.system[name](data, (res) => {
      try {
        resolve(res)
      } catch (error) {
        reject(error)
      }
    })
  })
}

// 根据ua判断是否在app客户端内
export const isClient = /wenxiaobai/.test(navigator.userAgent.toLowerCase())

// 复制兼容方法，navigator.clipboard不可用时候调用
export function copyToClipboard(text) {
  const textarea = document.createElement('textarea')
  textarea.value = text
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
}

// 因安全问题已禁用，如果不支持navigator.clipboard可改为直接提示不支持
export function getFromClipboard() {
  let text = ''
  const textarea = document.createElement('input')
  document.body.appendChild(textarea)
  textarea.focus()
  document.execCommand('paste')
  text = textarea.value
  document.body.removeChild(textarea)
  return text
}

// app端埋点调用封装
export async function track(name, data) {
  if (!isClient) {
    return
  }
  try {
    console.log('track', name, data)
    const ret = await callBridge('analyticsEvent', {
      name,
      content: JSON.stringify({data})
    })
    console.log('track finish', ret)
  } catch (error) {
    console.log(error)
  }
}
