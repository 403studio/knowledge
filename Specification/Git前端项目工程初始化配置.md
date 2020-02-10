# Git前端项目工程初始化配置

## 相关工具
* **stanard-version**,Automate versioning and CHANGELOG generation, with semver.org and conventionalcommits.org
* **semver**,Semantic Versioning(Given a version number MAJOR.MINOR.PATCH)
* **conventional commits**,A specification for adding human and machine readable meaning to commit messages
* **commitlint**,Lint commit messages 
* **eslint**,Find and fix problems in your JavaScript code
* **git hooks**,Git has a way to fire off custom scripts when certain important actions occur
* **husky**,Git hooks made easy 🐶 woof!

## 整体思路
通过git hooks提供的功能为提交日志，代码格式进行规范性检查，从而达到git commit日志的格式标准化。使用stanard-version和标准话的提交日志为我们自动的生成CHANGELOG和版本标签。