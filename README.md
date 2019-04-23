# react-base

> 使用 vue-cli@2 驱动的 react 项目
> 使用 webpack@4 + babel@7 + (css/less module) + prettier 来构建
> 推荐使用 npm i -S classnames 库来更好的使用 css module

内置了 `husky` 与 `eslint-config-standard` 与 `prettier-eslint` 来运行 `git commit` 时代码的自动格式化。

状态管理工具方面使用 `@rematch` , 并且内置了插件 `@rematch/immer` 以及 `@rematch/loading`

具体使用方式参考: [Rematch实践指南](https://rematch.gitbook.io/handbook/cha-jian)

内置了组件库 `antd` 结合 `babel-plugin-import` 做了组件（`lodash`也可以）的按需引入 (直接修改 `src/theme.js` 可以修改主题色)，当然要用别的组件库也是可行的，需要改的东西很少不是嘛？

使用 `react-router-config` 来达到和 `vue-router` 类似的体验。

结合 `react-loadable` 与 `import()` 实现了路由的按需加载

`package.json` 使用了 `~` 版本，来尽量保证安装时依赖升级导致项目报错问题

对于 `mock` 数据的需求，使用`npm run dev-mock`启动服务，实现了两种途径的mock数据：
1. 直接 `webpack-dev-server` 提供的 `proxyTable`
2. 使用本地 `mock` 数据，在 `mocker`文件夹下，修改添加即可， 或者使用 `easymock` 这样类似的在线 mock 服务，基于这样的需求实现了一个 `apiProxy` 的高阶函数，提供了本地mock的支持，当然他也能够比较方便的进行各种需求的改造。

```js
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
```

## branch

**在 `base` 分支有最小的实现，只实现了与 `create-react-app` 基础一样的功能**

## Build Setup

```bash
#  安装依赖
npm install # cnpm i

#  启动开发服务与热重载
npm run dev

# 启动开发服务与热重载-开启 mock 数据
npm run dev-mock

# 建立生产环境代码
npm run build

# 建立生产环境代码并且查看代码大小分析
npm run build --report

# format code 格式化代码，推荐使用编辑器 添加 eslint prettier 保存自动格式化
npm run format-code
```
