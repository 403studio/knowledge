# Git

## 操作推荐
* 使用VSCode编辑提交日志，`git config --global 'core.editor code -w'`
* 使用`git merge <branch> --no-ff`进行分支合并

## Git日志规范
统一规范的日志利于后期的代码检查和问题排除，使用标准兼容的日志格式更能够与其他工具配合提高项目代码日志的规范性。推荐使用[Conventional Commits Specification](https://conventionalcommits.org/)
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```
```
fix: correct minor typos in code

see the issue for details

on typos fixed.

Reviewed-by: Z
Refs #133
```

> The commit contains the following structural elements, to communicate intent to the consumers of your library:
> * **fix**: a commit of the type fix patches a bug in your codebase (this correlates with PATCH in semantic versioning).
> * **feat**: a commit of the type feat introduces a new feature to the codebase (this correlates with MINOR in semantic versioning).
> * **BREAKING CHANGE**: a commit that has a footer BREAKING CHANGE:, or appends a ! after the type/scope, introduces a breaking API change (correlating with MAJOR in semantic versioning). A BREAKING CHANGE can be part of commits of any type.
> * types other than fix: and feat: are allowed, for example [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) (based on the the Angular convention) recommends chore:, docs:, style:, refactor:, perf:, test:, and others.
> * footers other than BREAKING CHANGE: <description> may be provided and follow a convention similar to [git trailer format](https://git-scm.com/docs/git-interpret-trailers)

Type | Description
- | -
feat | 新增feature
fix | 修复bug
docs | 仅仅修改了文档，比如README, CHANGELOG, CONTRIBUTE等等
style | 仅仅修改了空格、格式缩进、都好等等，不改变代码逻辑
refactor | 代码重构，没有加新功能或者修复bug
perf | 优化相关，比如提升性能、体验
test | 测试用例，包括单元测试、集成测试等
chore | 改变构建流程、或者增加依赖库、工具等

## 使用commitlint+husky实现提交日志的规范检查
[commitlint](https://commitlint.js.org/)和[husky](https://github.com/typicode/husky)配合能够实现提交日志的规范检查

```json
// package.json
{
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }  
  }
}
```

## 使用standard-version根据commit log自动生成Changelog
> [standard-version](https://github.com/conventional-changelog/standard-version):Automate versioning and CHANGELOG generation, with semver.org and conventionalcommits.org