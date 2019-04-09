# react-base

> 使用 vue-cli@2 驱动的 react 项目
> 使用 webpack@4 + babel@7 + (css/less module) + prettier 来构建
> 推荐使用 npm i -S classnames 库来更好的使用 css module

内置了 `husky` 与 `eslint-config-standard` 与 `prettier-eslint` 来运行 `git commit` 时代码的自动格式化。

状态管理工具方面使用 `@rematch` , 并且内置了插件 `@rematch/immer` 以及 `@rematch/loading`

具体使用方式参考: [Rematch实践指南](https://rematch.gitbook.io/handbook/cha-jian)

内置了组件库 `antd` 结合 `babel-plugin-import` 做了组件（`lodash`也可以）的按需引入 (直接修改 `src/theme.js` 可以修改主题色)

使用 `react-router-config` 来达到和 `vue-router` 类似的体验。

结合 `react-loadable` 与 `import()` 实现了路由的按需加载

`package.json` 使用了 `~` 版本，来尽量保证安装时依赖升级导致报错问题

## branch

**在 `base` 分支有最小的实现，只实现了与 `create-react-app` 基础一样的功能**

## Build Setup

```bash
# install dependencies 安装依赖
npm install # cnpm i

# serve with hot reload at localhost:8080 启动开发服务与热重载
npm run dev

# build for production with minification 建立生产环境代码
npm run build

# build for production and view the bundle analyzer report 建立生产环境代码并且查看代码大小分析
npm run build --report

# format code 格式化代码，推荐使用编辑器 添加 prettier 自动格式化
npm run format-code
```
