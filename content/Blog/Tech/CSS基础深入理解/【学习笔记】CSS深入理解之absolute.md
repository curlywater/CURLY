# CSS深入理解之absolute

## 绝对定位的特性

absolute与float相似，都有破坏性和包裹性。float的一些应用场景中也可用absolute替代

## 绝对定位的行为表现

在未手动定位的情况下，绝对定位元素有以下特性

- 去float化 - float属性将会失效
- 跟随性 - 根据原有位置脱离文档流放置

## 无依赖绝对定位元素的使用

无依赖绝对定位元素 —— 即父容器未设置relative，未手动定位的绝对定位元素

无依赖绝对定位元素可以使用margin值进行定位，实现脱离文档流的相对定位效果

应用实例：

1. [图标定位](https://www.imooc.com/code/4540)：角标之类的可以使用DOM位置结合绝对定位margin偏移实现定位，不一定要使父容器成为包含块
2. [下拉框定位](https://www.imooc.com/code/4541)：下拉框和输入框之间的联系可以使用绝对定位margin偏移实现
3. [边缘定位](https://www.imooc.com/code/4542)：利用跟随性，使元素跟随空白字符放置
4. [图标对齐和文本溢出处理](https://www.imooc.com/code/4543)

## 绝对定位脱离文档流

- 绝对定位+动画，避免回流和重绘

- 覆盖层级，z-index + 绝对定位 > 后置绝对定位元素 > 前置绝对定位元素 > z-index > 普通元素

  <p data-height="265" data-theme-id="0" data-slug-hash="XyQqMQ" data-default-tab="css,result" data-user="curlywater" data-pen-title="Demo: absolute & z-index" class="codepen">See the Pen <a href="https://codepen.io/curlywater/pen/XyQqMQ/">Demo: absolute & z-index</a> by Curly.Water (<a href="https://codepen.io/curlywater">@curlywater</a>) on <a href="https://codepen.io">CodePen</a>.</p>
  <script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## 绝对定位和width/height

- 无固定width/height，绝对定位方向是对立的（如left vs right, top vs bottom）的时候，绝对定位元素拉伸。可应用于宽高自适应
- 有固定width/height，绝对定位拉伸失效
- 固定width + left + right，相当于元素有了一个固定宽度，这时使用margin: auto可达到居中效果