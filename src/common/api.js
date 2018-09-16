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
export function userLogin() {
  return Promise.resolve({ success: true })
}
/**
 * 获取字体生成的返回。
 * @param {any} [fontMap={}]
 * @returns
 */
export function getUserInfo() {
  return Promise.resolve({})
}
