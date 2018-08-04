import { get, post } from './fetch'

/**
 * 获取字体生成的返回。
 * @param {any} [fontMap={}]
 * @returns
 */
export function getFontContent(fontMap = {}) {
  return post('/api/font/', { fontMap })
}
/**
 * 获取字体生成的返回。
 * @param {any} [fontMap={}]
 * @returns
 */
export function userLogin(fontMap = {}) {
  return Promise.resolve({})
}
/**
 * 获取字体生成的返回。
 * @param {any} [fontMap={}]
 * @returns
 */
export function getUserInfo(fontMap = {}) {
  return Promise.resolve({})
}
