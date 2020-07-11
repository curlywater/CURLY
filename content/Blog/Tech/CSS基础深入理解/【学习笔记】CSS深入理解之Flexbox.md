# CSS深入理解之Flexbox

Flexbox Layout 的本质是给容器伸缩/排序元素的能力，以分配空白区域。

Flexbox Layout是一组组合属性，容器container和子项item分别有一系列属性

![A diagram explaining flexbox terminology. The size across the main axis of flexbox is called the main size, the other direction is the cross size. Those sizes have a main start, main end, cross start, and cross end.](https://css-tricks.com/wp-content/uploads/2018/11/00-basic-terminology.svg)

## container

`display: flex/inline-flex` - 定义一个flexbox容器

`flex-direction: row/row-reverse/column/column-reverse` - 定义容器主轴方向

`flex-wrap: no-wrap/wrap/wrap-reverse` - 定义主轴上的折行行为

`flex-flow: flex-direction || flex-wrap` - 组合语法

`justify-content: flex-start/flex-end/center/space-between/space-around/space-evently` - 定义主轴剩余空白区域分配策略

- `space-between` - 两头对齐，中间均分
- `space-around` - 元素周围分配的空间相等
- `space-evently` - 元素之间的间隔相等

`align-items: flex-start/flex-end/center/stretch/baseline` - 定义侧轴剩余空白区域分配策略

`align-content:stretch/flex-start/flex-end/center/space-between/space-around` - 定义行间剩余空白区域分配策略



## item

`flex-grow: 0/number` - 子项伸展权重

`flex-shrink: 1/number` - 子项收缩权重

`flex-basis: content/px/rem/50%..` - 子项内容块大小

`order: 0/number` - 子项排序位列，可负值

`align-self` - 子项侧轴剩余空白区域分配策略

`flex: flex-grow || flex-shrink || flex-basis` - 组合语法，默认值0 1 auto



## 示例

- 在flexbox中，子项设置margin: auto，margin降吸收空白区域，使子项完全剧中
- 结合媒体查询实现自适应



## QA

- 如何用flex实现多行子项空白一致的效果？