将页面特定的内容进行移位，添加到其他元素下
```js
<div class="filter" @click="filter" ref="filter">筛选</div>
...
// 增加筛选按钮
    this.$nextTick(() => {
      document
        .getElementsByClassName('van-tabs__nav--line')[0]
        .appendChild(this.$refs.filter)
    })
```