# VSCode
[官方文档](https://code.visualstudio.com/docs)
## webpack的别名路劲问题
现代前端开发经常会使用到Webpack进行前端打包构建工具，其中webpack的alias能够为我们在引入模块时提供便捷的引入（不再需要使用一堆的../）。但是VSCode对这些使用了别名的路劲是无法自动识别，这就导致了无法实现这些模块的代码的智能提示和跳转功能。VSCode通过`jsconfig.json`能够很好的解决这些问题
> The presence of jsconfig.json file in a directory indicates that the directory is the root of a JavaScript Project. The jsconfig.json file specifies the root files and the options for the features provided by the JavaScript language service.

Option | Description
-|-|
noLib | Do not include the default library file (lib.d.ts)
target | Specifies which default library (lib.d.ts) to use. The values are "es3", "es5", "es6", "es2015", "es2016", "es2017", "es2018", "es2019", "es2020", "esnext".
module | Specifies the module system, when generating module code. The values are "amd", "commonJS", "es2015", "es6", "esnext", "none", "system", "umd".
moduleResolution | Specifies how modules are resolved for imports. The values are "node" and "classic".
checkJs | Enable type checking on JavaScript files.
experimentalDecorators | Enables experimental support for proposed ES decorators.
allowSyntheticDefaultImports | Allow default imports from modules with no default export. This does not affect code emit, just type checking.
baseUrl | Base directory to resolve non-relative module names.
paths | Specify path mapping to be computed relative to baseUrl option.

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 使用VSCode调试VUE工程
[Vue.js debugging in Chrome and VS Code ](https://github.com/Microsoft/vscode-recipes/tree/master/vuejs-cli)
* 修改webpack开发环境的配置，`devtool: 'source-map'`
* 点击调式按钮选择`Chrome`作为环境
* 修改launch.json
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "vuejs: chrome",
      "url": "http://localhost:8080",
      "webRoot": "${workspaceFolder}/src",
      "breakOnLoad": true,
      "sourceMapPathOverrides": {
        "webpack:///./src/*": "${webRoot}/*",
        "webpack:///src/*": "${webRoot}/*",
        "webpack:///*": "*",
        "webpack:///./~/*": "${webRoot}/node_modules/*"
      }
    }
  ]
}
```
* 设置好断点即可进行调试了