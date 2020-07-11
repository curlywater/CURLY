# CSS深入理解之z-index

## 层叠上下文

- 什么是层叠上下文？

   在z轴上延伸出一个层级，离父级层叠上下文的顶部更近

- 如何产生层叠上下文？

  - 根元素具有根层叠上下文

  - z-index不为"auto"的定位元素
  - 一个 z-index 值不为 "auto"的 flex 项目 (flex item)，即：父元素 display: flex|inline-flex，
  - [`opacity`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/opacity) 属性值小于 1 的元素，
  - [`transform`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform) 属性值不为 "none"的元素，
  - [`mix-blend-mode`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mix-blend-mode) 属性值不为 "normal"的元素，
  - [`filter`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter)值不为“none”的元素，
  - [`perspective`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective)值不为“none”的元素，
  - [`isolation`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/isolation) 属性被设置为 "isolate"的元素，
  - `position: fixed`（Chrome等webkit内核浏览器）
  - 在 [`will-change`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/will-change) 中指定了任意 CSS 属性，即便你没有直接指定这些属性的值（参考 [这篇文章](http://dev.opera.com/articles/css-will-change-property/)）
  - [`-webkit-overflow-scrolling`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/-webkit-overflow-scrolling) 属性被设置 "touch"的元素

- 什么是层叠水平？

  层叠上下文中的每个元素都有一个层叠水平，决定同一个层叠上下文中的元素在z轴上的显示顺序。遵循“后来居上”和“谁大谁上”的层叠原则。

## 层叠顺序

一个层叠上下文内，元素发生层叠时候有着特定的垂直显示顺序，也就是下图显示的层叠规则

![层叠顺序](https://image-static.segmentfault.com/110/990/1109906715-591d2f0490456_articlex)

- 装饰层 

- 负z-index的依赖z-index层叠上下文元素 
- 块状盒子（布局）
-  float浮动盒子（布局）
- inline/inline-block水平盒子（内容）
- z-index为auto的依赖z-index层叠上下文元素或不依赖z-index的层叠上下文 
- 正z-index的依赖z-index层叠上下文元素



### 关于“依赖z-index的层叠上下文”

创建层叠上下文的方式前文已列出，定位元素以及父元素为flex定位的元素，必须依赖z-index值才能创建层叠上下位，所以统称为依赖z-index的层叠上下文元素。而其他属性即不依赖z-index的层叠上下文。

## z-index和层叠上下文

- 默认z-index: auto相当于是z-index: 0但不会产生层叠上下文
- z-index只对依赖z-index的层叠上下文元素起作用
- z-index不为auto的依赖z-index的层叠上下文元素会创建层叠上下文
- z-index层叠顺序的比较止步于父级层叠上下文

## z-index实践经验

- 非浮层元素避免设置z-index值（可以通过更改DOM顺序，创建层叠上下文来代替），z-index值不需要超过2
- 使用负z-index实现可访问性隐藏