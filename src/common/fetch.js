import qs from 'qs'

const defaultOptions = {
  credentials: 'include',
  // credentials: 'same-origin',
  // credentials: 'credentials',
  headers: {
    // 'Accept': 'application/json, application/javascript',
    // 'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Type': 'application/json'
  }
}
const commonRes = (p, type = 'json') => {
  return p.then(res => {
    if (type === 'json') {
      return res.json()
    }
    return res.text()
  })
}

/**
 * 拦截请求函数，只在 开发并且开启了mock的情况下启用
 * @param {Function} fn
 * @returns {fn}
 */
const apiProxy = fn => {
  if (process.env.NODE_ENV === 'development' && process.env.mock === true) {
    return function(url, data = {}, otherOptions = {}) {
      return import('../mocker/index').then(({ default: mocker }) => {
        // 如果未找到 mock 对应的数据的情况依旧走老代码
        if (!mocker[url]) {
          return fn.call(this, url, data, otherOptions)
        }
        const isFn = typeof mocker[url] === 'function'
        // 如果是一个函数那么一定要返回 Promise
        if (isFn) {
          return mocker[url](data)
        }
        // 其他情况，直接使用Promsie返回值
        return mocker[url]
      })
    }
  }
  return function(...args) {
    return fn.apply(this, args)
  }
}

/**
 * 基础的 get 方法
 *
 * @export
 * @param {String} url
 * @param {Object} [data={}]
 * @param {Object} [otherOptions={}]
 * @returns
 */
export const get = apiProxy(function get(url, data = {}, otherOptions = {}) {
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
    ...defaultOptions,
    ...otherOptions
  }
  const { type = 'json' } = otherOptions

  return commonRes(fetch(url, option), type)
})

/**
 * 一个基础的 post 请求方法
 *
 * @export
 * @param {String} url
 * @param {Object} [data={}]
 * @param {Object} [otherOptions={}]
 * @returns
 */
export const post = apiProxy(function post(url, data = {}, otherOptions = {}) {
  const option = {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    // body: qs.stringify(data),
    body: JSON.stringify(data),
    ...otherOptions
  }
  const { type = 'json' } = otherOptions
  return commonRes(fetch(url, option), type)
})
