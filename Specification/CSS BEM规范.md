# CSS BEM规范

> There are only two hard problems in Computer Science: cache invalidation and naming things — Phil Karlton

好的样式手册能够显著的提高开发速度，debug速度以及在原有代码上完成新功能的效率。规范标准我们都熟知并或多或少的应用于项目中，然而不幸的是在以往大多数CSS代码开发过程中很少会使用到命名规范，从长远看这会导致最后产生的CSS代码库很难维护，可移植性不高。

[BEM](http://getbem.com/)方法确保每一个参加了同一网站开发项目的人，基于一套代码规范去开发，这样非常有利于团队成员理解彼此的代码，而且对于后续接手项目的开发人员来说，也是一件好事。BEM - Block Element Modfier（块元素编辑器）是一个很有用的方法，它可以帮助你创建出可以复用的前端组件和前端代码。

BEM是Block、Element、Modifier的缩写
* Block，代表了一个独立的块级元素，可以理解为功能组件块。一个Block就是一个独立的功能区块，比如头部是个block，表单功能输入框也可以是一个block。block功能可大可小。
* Element，是Block的一部分不能独立来使用，所有的Element都是与Block紧密关联的。例如一个带有icon的输入框，那么这个icon就是这个输入框Block的一个Element，脱离了输入框Block那么这个icon就没有意义。
* Modifier，是用来修饰Block或Element，表示block或者element在外观或行为上的改变。例如前文提到的输入框Block，当鼠标悬停时边框高亮，那么这个高亮的效果就应该用Modifier来实现

## BEM命名

* 尽量只使用类名选择器，不要使用tag或id选择器
* 使用小写字母、数字或-，多个单词描述时采用`-`来连接，例如`el-input`
* 使用两个`_`来连接Block和Element，Block__Element，例如`el-input__icon`
* 使用两个`-`来连接Modifier和Element或Block，Block__Element--modifier或Block--modifier，例如`el-input--color-primary`、`el-input__icon--size-small`

```html
<form class="form form--theme-xmas form--simple">
  <input class="form__input" type="text" />
  <input
    class="form__submit form__submit--disabled"
    type="submit" />
</form>
<!-- 使用BEM规范 -->
<style>
.form { }
.form--theme-xmas { }
.form--simple { }
.form__input { }
.form__submit { }
.form__submit--disabled { }
</style>
```