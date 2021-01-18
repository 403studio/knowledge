# 开发使用相关

## README.md

README.md文档是对整个工程的说明面向项目的开发人员，包括开发使用说明、文档说明、部署说明等，确保任何开发人员通过该文档都能够快速上手开发。对于有统一文档中心的项目，在该文档中只需简单的描述该前端工程的作用，以及文档中心地址。如果没有统一的文档中心则应包括：

* 项目简要说明
* 开发环境说明(确保所有开发，都能够通过该说明能够在本地成功的启动本地开发环境)
  * 前提条件或需要哪些准备
  * 如何启动工程以及需要注意哪些事项
  * 用户鉴权(特别是使用第三方用户登录机制应详细说明本地开发如何进行用户登录鉴权)
  * 如何调试线上问题
  * 接口说明文档地址
* 测试环境说明(部署、流程、调试)
* 生产环境说明(部署、流程、调试)
* 其他注意事项
  * ESlint规范
  * git分支规范
  * Vue规范

# 复用相关

坚持DRY(donot repeat yourself)原则，对于同一逻辑出现3次以上我们就应考虑是否能够逻辑进行抽离，抽象为公用逻辑统一使用。无论是业务代码(例如：多个模块都需要跳转到某一详情页面，那么这个跳转逻辑就应该抽离)还是业务组件(例如：移动端的select)都应坚持DRY原则。

* 业务组件如果只在某个模块或某个页面重复多次使用，则应在该模块或页面下添加`components`文件夹放置模块或页面级别的公用组件，组件命名建议`业务-功能`
* 如果组件在多个功能模块需要使用，则应该在`src/components`下放置跨功能模块的公用组件，组件命名建议`公司-功能`
* 如果是全局组件，频繁出现在各功能模块的各个业务则应该在`src/components/global`下放置全局公用组件，并通过入口文件统一自动加载注册，每个全局组件都应该是一个文件夹，包括：组件业务实现文件和README.md使用文件，在README.md中应详细的说明组件的使用说明和样例代码，组件命名建议`公司-功能`
* 所有全局的复用功能(全局组件，全局filters，全局mixins，全局公用函数等)，都应统一维护到一个文档`docs/使用说明.md`，任何开发未经主程序员同意不能对已上线的公用功能进行修改。
* 复用功能，顾名思义就是多个地方会使用到，因此做任何修改前都应全局搜索所有使用到的地方，做修改前一定要确保不能影响到其他地方功能

## 推荐实践

* 移动端select抽象成公用组件
* 数据字典翻译抽象成全局filters
* 日期格式化抽象成全局filters
* 金额格式化抽象成全局filters
* 获取单个数据字典列表抽象成vuex.common的action或全局通用函数
* 所有公用复用部分都应维护到一个说明文档`docs/使用说明.md`，任何公用功能修改都应同步更新文档。如果整个项目有同一的文档中心，也可以维护到项目文档中心中

# 配置先关

## 别名支持VScode快速定位
使用vue-cli脚手架工具搭建的工程，默认会配置`@`别名，我们也可以在vue.config.js中配置其他别名，例如：
```js
  chainWebpack: (config) => {
    // 别名
    config.resolve.alias
      .set('utils', resolve('src/utils'))
      .set('api', resolve('src/api'))
  },
```
配置了别名后，默认情况下VSCode是不支持对这类文件的定位跳转的，可以在项目根目录添加`jsconfig.json`文件并配置先关信息即可实现支持(添加配置后需要重启编辑器)
```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["./src/*"],
      "utils/*": ["./src/utils/*"],
      "com/*": ["./src/components/*"],
      "api/*": ["./src/api/*"]
    }
  }
}
```

# 项目组织结构

对于全局组件、路由文件、状态管理文件都因使用`require.context`实现文件的自动加载注册，从而解决每次添加相关文件都需要同步修改入口文件的问题。

## 按模块拆分路由文件

不管是大项目还是小项目，我们都应该按模块对路由文件进行拆分，并通过一个入口文件统一引入。在该入口文件处理一下逻辑：
* 全局自动加载模块路由文件(webpack4后支持文件的自动加载)
* 使用`addRoutes`添加其他相关路由
* 配置全局路由守卫

使用require.context来实现文件的自动扫描加载
```js
let routes = []
const requireContext = require.context(
  './routes',
  true,
  /\.js$/
)
requireContext.keys().forEach(filename => {
  const moduleConfig = requireContext(filename)
  routes = [...routes, ...(moduleConfig.default || moduleConfig)]
})
```

## 按模块拆分Vuex状态管理文件

对于中大型项目，应按模块对状态管理文件进行拆分，并使用命名空间对state进行严格区分。小型项目涉及3个以上功能模块需要使用状态管理也建议按模块进行拆分。同样可以使用`require.context`来实现模块文件的自动加载，开发模式下应开启严格模式(生产模块不应开启避免而外开销)严格按vuex推荐的策略执行相关操作。

因为使用了`namespaced`，所以在使用map类方法时应避免使用嵌套方式
```js
// 不推荐
computed: {
  ...mapState({
    a: state => state.some.nested.module.a,
    b: state => state.some.nested.module.b
  }),
  ...mapGetters([
    'some/nested/module/someGetter', // -> this['some/nested/module/someGetter']
    'some/nested/module/someOtherGetter', // -> this['some/nested/module/someOtherGetter']
  ])
},
methods: {
  ...mapActions([
    'some/nested/module/foo', // -> this['some/nested/module/foo']()
    'some/nested/module/bar' // -> this['some/nested/module/bar']()
  ])
}
// 推荐使用
computed: {
  ...mapState('some/nested/module', {
    a: state => state.a,
    b: state => state.b
  }),
  ...mapGetters('some/nested/module', [
    'someGetter', // -> this.someGetter
    'someOtherGetter', // -> this.someOtherGetter
  ])
},
methods: {
  ...mapActions('some/nested/module', [
    'foo', // -> this.foo()
    'bar' // -> this.bar()
  ])
}
```

# 性能优化相关
