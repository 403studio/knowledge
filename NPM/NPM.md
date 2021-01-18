# NPM

## nrm
nrm can help you easy and fast switch between different npm registries, now include: npm, cnpm, taobao, nj(nodejitsu).

## nvm
Node Version Manager

## npx
执行 npm package的命令。
Executes <command> either from a local node_modules/.bin, or from a central cache, installing any packages needed in order for <command> to run.

By default, npx will check whether <command> exists in $PATH, or in the local project binaries, and execute that. If <command> is not found, it will be installed prior to execution.

## NPM 指令(Version 6.x)
https://docs.npmjs.com/cli/v6

### npm install (别名：npm i;npm add)

### npm ci
该命令类似于`npm install`，更多的应用于自动化打包部署环境如测试环境、持续集成环境和生产部署环境。任何需要*clean install of dependencies*的情况下都应考虑使用`npm ci`。通过跳过某些面向开发用户的功能，可以比常规的npm安装快很多
* 使用`npm ci`的前提是工程必须包含有*package-lock.json*或者*shrinkwrap.json*
* 如果package-locks文件与*package.json*中的依赖包不匹配（如版本信息），会提示错误信息并退出
* 只能应用于整个项目，不能独立安装某个依赖
* 如果*node_modules*已经存在，那么在安装依赖前会先删除该目录
* 不会去修改package.json和其他任何package-locks文件

### npm link
该命令在我们本地做命令行工具的开发和调试的时候特别有用，通过创建链接我们不需要在开发时重复的buld以及publish

Package linking is a two-step process.

First, npm link in a package folder will create a symlink in the global folder `{prefix}/lib/node_modules/<package>` that links to the package where the npm link command was executed. It will also link any bins in the package to `{prefix}/bin/{name}`. Note that npm link uses the global prefix (see npm prefix -g for its value).

Next, in some other location, npm link package-name will create a symbolic link from globally-installed package-name to node_modules/ of the current folder.

Note that package-name is taken from package.json, not from directory name.

### npm prefix [-g]
Print the local prefix to standard out. This is the closest parent directory to contain a package.json file or node_modules directory, unless -g is also specified.

### npm config
npm gets its config settings from the command line, environment variables, npmrc files, and in some cases, the package.json file.

* `npm config get <key>`
* `npm config set <key> <value> [-g|--global]`
* `npm config delete <key>`
* `npm config list`

### npm version
Run this in a package directory to bump the version and write the new data back to package.json, package-lock.json, and, if present, npm-shrinkwrap.json.
`npm version patch -m "Upgrade to %s for reasons"`

### npm publish
Publishes a package to the registry so that it can be installed by name. All files in the package directory are included if no local .gitignore or .npmignore file exists. If both files exist and a file is ignored by .gitignore but not by .npmignore then it will be included.

### .npmrc文件
与之相关的四个文件是：
* 各项目中的配置文件/path/to/your/project/.npmrc
* 各用户的配置文件~/.npmrc
* 全局配置文件$PREFIX/etc/npmrc
* npm内置的配置文件/path/to/npm/npmrc
