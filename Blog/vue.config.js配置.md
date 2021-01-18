# 常用插件

## copy-webpack-plugin

Copies individual files or entire directories, which already exist, to the build directory.该插件使用是要注意webpack的版本，从7.0.0以后是使用的webpack5，因此如果是webpack4则应降版本

```js
configureWebpack: {
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: path.join(__dirname, './config'),
            to: path.join(__dirname, './dist/config/[name].js'),
            transform (content) {
              return `window.${process.env.VUE_APP_CONFIG_KEY}=${content.toString()}`
            }
          },
          // 加载本地配置文件，便于本地灵活切换环境
          {
            from: path.join(__dirname, './config/index.json.local'),
            to: path.join(__dirname, './dist/config/index.js'),
            noErrorOnMissing: true,
            force: true,
            transform (content) {
              return `window.${process.env.VUE_APP_CONFIG_KEY}=${content.toString()}`
            }
          }
        ]
      })
    ]
  }
```

# 其他配置

## 添加别名
```js
  chainWebpack: (config) => {
    // 别名
    config.resolve.alias
      .set('utils', resolve('src/utils'))
      .set('api', resolve('src/api'))
  },
```

## 添加html参数
```js
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap(args => {
        args[0].timestamp = +new Date()
        return args
      })
  },
```

```html
<script src="./config/index.js?t=<%= htmlWebpackPlugin.options.timestamp %>"></script>
```