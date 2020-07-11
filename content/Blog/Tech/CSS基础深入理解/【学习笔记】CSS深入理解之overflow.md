# CSS深入理解之overflow

## overflow基本属性

### overflow属性介绍

overflow: visible(默认)|hidden|scroll|auto|inherit

当overflow-x 与 overflow-y值相同时，等同于overflow

当overflow-x 与 overflow-y值不相同时，其中一个值被赋予hidden|auto|scroll时，若另一个值为visible，
那这个visvible会被重置为auto

<p data-height="265" data-theme-id="0" data-slug-hash="dQEZdw" data-default-tab="css,result" data-user="curlywater" data-pen-title="Demo: overflow-x: auto" class="codepen">See the Pen <a href="https://codepen.io/curlywater/pen/dQEZdw/">Demo: overflow-x: auto</a> by Curly.Water (<a href="https://codepen.io/curlywater">@curlywater</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### overflow作用前提

1. 元素非 display: inline
2. 对应方位的尺寸限制: width/height/max-width/max-height/absolute拉伸
3. 对于单元格 td 等, 需要 table 为 table-layout: fixed 状态才可以

## overflow与滚动条

1. 页面默认滚动条来自html，因此若要去除默认滚动条，只需要

   ```css
   html {
       overflow: hidden;
   }
   ```

2. 获取滚动高度

   ```js
   var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
   /* chrome浏览器：document.body.scrollTop */
   /* 其他浏览器：document.documentElement.scrollTop*/
   ```

3. 内部padding-bottom缺失

   除Chrome之外的其他浏览器会有padding-bottom缺失效果，将导致scrollHeight值不一致

4. 滚动条宽度机制

   1. 滚动条会占用容器的可用宽度|高度

   2. 计算滚动条宽度：containerWidth - boxWidth

   3. 因宽度占用，overflow: auto可能会造成容器内部局部混乱，因此容器内部需使用自适应布局

   4. 水平居中跳动问题，容器定宽居中时，当视口高度变化导致滚动条出现将导致容器跳动。

      解决方法：

      1. 针对IE9以下浏览器，强制设置html滚动
      2. 其他浏览器，利用calc函数计算滚动条宽度（浏览器宽度 - 可用内容区宽度），通过padding把宽度补给容器 - [效果演示](https://codepen.io/curlywater/pen/wQbpgd)

5. 自定义滚动条

   - webkit自定义滚动条，[详细解读](https://css-tricks.com/custom-scrollbars-in-webkit/)
   - 自定义滚动条插件
     - [malihu-custom-scrollbar-plugin](https://github.com/malihu/malihu-custom-scrollbar-plugin) - 支持IE8+，扩展性极佳
     - [antiscroll](https://github.com/Automattic/antiscroll) - cross-browser native OS X Lion scrollbars

6. iOS原生滚动回调

   ```css
   -webkit-overflow-scrolling: touch;
   ```

## overflow与BFC

overflow: visible不会产生BFC

overflow: hidden|scroll|auto 产生BFC，但是具有溢出不可见的副作用

## overflow与绝对定位

overflow失效：绝对定位元素不总是被overflow元素剪裁/随滚动条滚动，尤其当overflow元素处于绝对定位元素和其包含块中间时

避免失效的方法：

1. overflow元素自身为包含块
2. overflow元素的子元素为包含块
3. overflow元素的子元素有transform声明

## 依赖overflow的样式表现

1. 在overflow为visible时，resize属性将会失效
2. ```text-overflow: ellipsis```以```overflow: hidden```为前提

## overflow与锚点技术

锚点技术的实质时容器改变滚动高度