import { message } from 'antd'
import qs from 'query-string'

const defaultOptions = {
  credentials: 'same-origin',
  headers: {
    // 'Accept': 'application/json, application/javascript',
    // 'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Type': 'application/json',
  },
}
const getFullUrl = (url) => {
  return url
}
const commonRes = (p) => {
  return p.then((res) => {
    return res.json()
  })
}
/**
 * 基础的 get 方法
 *
 * @export
 * @param {any} url
 * @param {any} [data={}]
 * @returns
 */
export function get(url, data = {}) {
  const query = qs.stringify(data)
  if (query) {
    if (url.indexOf('?') > -1) {
      url += `&${query}`
    } else {
      url += `?${query}`
    }
  }
  const option = {
    method: 'GET',
  }
  return commonRes(fetch(getFullUrl(url), option))
}

/**
 * 一个基础的 post 请求方法
 *
 * @export
 * @param {any} url
 * @param {any} [data={}]
 * @returns
 */
export function post(url, data = {}) {
  const option = Object.assign({}, defaultOptions, {
    method: 'POST',
    body: JSON.stringify(data),
  })
  return commonRes(fetch(getFullUrl(url), option))
}
