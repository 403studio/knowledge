# Git前端项目工程初始化配置

## 相关工具
* **stanard-version**,Automate versioning and CHANGELOG generation, with semver.org and conventionalcommits.org
* **semver**,Semantic Versioning(Given a version number MAJOR.MINOR.PATCH)
* **conventional commits**,A specification for adding human and machine readable meaning to commit messages
* **commitlint**,Lint commit messages 
* **eslint**,Find and fix problems in your JavaScript code
* **git hooks**,Git has a way to fire off custom scripts when certain important actions occur
* **husky**,Git hooks made easy 🐶 woof!
* **eslint**

## 整体思路
通过git hooks提供的功能为提交日志，代码格式等进行规范性检查，从而达到git commit日志的格式标准化。使用stanard-version和标准话的提交日志为我们自动的生成CHANGELOG和版本标签。

## 步骤
* 配置使用vscode进行git commit log的编写,`git config --global 'core.editor code -w'`
* 使用`npm init`初始化工程，生成package.json，如果有脚手架工具自动生成该文件则可略过此步骤
* 安装husky，是我们能够直接在package.json中就能够对git hooks进行配置（注意：最新的vue cli工具使用了yorkie来实现该功能，yorkie是尤大大fork自husky自己做了调整的工具包）
* 安装commitlint对提交日志做检查
```bash
# Install and configure if neeeded
npm install --save-dev @commitlint/cli @commitlint/config-conventional
echo "module.exports = {extends: ['@commitlint/config-conventional']};" > commitlint.config.js
```
* 配置`commit-msg`git hooks
```json
// package.json
{
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
// 如果是使用yorkie，使用`commitlint -E GIT_PARAMS`
```
* 安装standard-version，并配置package.json。如果是第一次运行来生成CHANGELOG则使用命令`npx standard-version --first-release`，会基于package.json中的version来生成CHANGELOG，并不会对版本号进行修改。在以后需要发布版本时直接运行`npm run release`即可，请注意需要在master上运行该命令以确保所有的tag都是基于master分支的。standard-version能够根据repository.url自动生成issue、commit等地址。`git commit -m "feat: xxxxx(#JIRA_ID)"`
```json
// package.json
{
  "scirpts": {
    "release": "standard-version",
    "lint": "vue-cli-service lint"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/myproject"
  },
  // standard-version配置，使用jira id
  "standard-version": {
    "scripts": {
      "postchangelog": "replace 'https://github.com/myproject/issues/' 'https://myjira/browse/' CHANGELOG.md"
    }
  }
}
```
* vue 项目配置实例
```json
// package.json节选
{
  "scirpts": {
    "release": "standard-version"
  },
  "gitHooks": {
    "pre-commit": "lint-staged",
    "commit-msg": "commitlint -E GIT_PARAMS"
  },
  "lint-staged": {
    "*.{js,vue}": [
      "vue-cli-service lint",
      "git add"
    ]
  }
}
```
