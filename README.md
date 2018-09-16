# react-base

> 使用 vue-cli@2 驱动的 react 项目
> 使用 webpack@4 + babel@7 + (css/less module) + prettier 来构建

**在 router 分支 有 使用 react + react-router + antd 的例子**

状态管理工具方面没有内置，推荐使用 rematch

配置了 AutoDllPlugin 进行模块提取，使用 react-router-config 来达到和 vue-router 类似的体验。

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
