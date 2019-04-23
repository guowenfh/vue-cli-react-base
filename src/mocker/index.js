import { getTrade } from './tradeMocker'
/*
 * 支持多种写法，
 * 如果 值是一个函数时，参数为传入的值，返回值必须是一个 Primise
 * 其余值将直接返回（可以导入文件，也可以有 mockjs 生成一个数据对象）
 */

export default {
  '/api/getTrade': getTrade
}
