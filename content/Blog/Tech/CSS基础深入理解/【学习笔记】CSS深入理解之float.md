# CSS深入理解之float

> [张鑫旭的CSS深入理解之float浮动](https://www.imooc.com/learn/121)学习笔记

## float的历史

float为产生文字环绕效果而生

## float的特性 — 包裹和破坏

- 包裹：即产生一个BFC
- 破坏：使父容器塌陷，脱离文档流，产生inline boxes环绕

### 清除浮动

1. clear - 类似于产生一个连接索道，使前文和后文关联，会产生margin重叠效果。
   - clear: both，这个元素和源码中后面的元素将不浮动
   - 非浮动元素和浮动元素之间不能通过外边距撑开距离
   - 因此需要一个单独的非浮动元素充当索道
2. 父容器BFC或者haslayout(IE6/IE7) - 封闭容器，不会产生margin重叠

```css
.clearfix:after {
    content: "";
    display: table;
    clear: both;
}
.clearfix {
    *zoom: 1; /*IE6, IE7产生haslayout*/
}
```

## float的表现

- 元素block化
- 去空格化，空格符成为环绕文本

### 浮动与流体布局应用

1. 文字环绕效果

   <p data-height="265" data-theme-id="0" data-slug-hash="RqOjLb" data-default-tab="result" data-user="curlywater" data-pen-title="float - text wrapping" class="codepen">See the Pen <a href="https://codepen.io/curlywater/pen/RqOjLb/">float - text wrapping</a> by Curly.Water (<a href="https://codepen.io/curlywater">@curlywater</a>) on <a href="https://codepen.io">CodePen</a>.</p>
   <script async src="https://static.codepen.io/assets/embed/ei.js"></script>

2. 左中右效果

   <p data-height="265" data-theme-id="0" data-slug-hash="QJPOxg" data-default-tab="result" data-user="curlywater" data-pen-title="float - center title" class="codepen">See the Pen <a href="https://codepen.io/curlywater/pen/QJPOxg/">float - center title</a> by Curly.Water (<a href="https://codepen.io/curlywater">@curlywater</a>) on <a href="https://codepen.io">CodePen</a>.</p>
   <script async src="https://static.codepen.io/assets/embed/ei.js"></script>

3. 单侧固定

   <p data-height="265" data-theme-id="0" data-slug-hash="pQBpjK" data-default-tab="result" data-user="curlywater" data-pen-title="float - Single side fixation" class="codepen">See the Pen <a href="https://codepen.io/curlywater/pen/pQBpjK/">float - Single side fixation</a> by Curly.Water (<a href="https://codepen.io/curlywater">@curlywater</a>) on <a href="https://codepen.io">CodePen</a>.</p>
   <script async src="https://static.codepen.io/assets/embed/ei.js"></script>

4. DOM与显示位置匹配的单侧固定

   <p data-height="265" data-theme-id="0" data-slug-hash="rQbpWR" data-default-tab="result" data-user="curlywater" data-pen-title="float - Single right side fixation " class="codepen">See the Pen <a href="https://codepen.io/curlywater/pen/rQbpWR/">float - Single right side fixation </a> by Curly.Water (<a href="https://codepen.io/curlywater">@curlywater</a>) on <a href="https://codepen.io">CodePen</a>.</p>
   <script async src="https://static.codepen.io/assets/embed/ei.js"></script>
第一种实现方式，保证向右浮动的元素写在前（先布局），内容区设置margin-right
   

第二种实现方式，为了使DOM和现实顺序一致，对内容区加一个向左浮动的盒子，没有指定宽度的盒子利用外边距保留剩余空间，实现宽度拉伸。使用负margin把左浮动的头像区移动到同行。

5. 两侧自适应

   <p data-height="265" data-theme-id="0" data-slug-hash="rQbpqB" data-default-tab="result" data-user="curlywater" data-pen-title="float - adapt both sides" class="codepen">See the Pen <a href="https://codepen.io/curlywater/pen/rQbpqB/">float - adapt both sides</a> by Curly.Water (<a href="https://codepen.io/curlywater">@curlywater</a>) on <a href="https://codepen.io">CodePen</a>.</p>
   <script async src="https://static.codepen.io/assets/embed/ei.js"></script>
使用table-cell产生一个BFC，去除掉浮动的影响

## 总结

浮动起源于实现文字环绕效果。

为了实现文字环绕效果，规范规定的措施是使父容器塌陷，元素脱离文档流浮动，元素周围的内容转换为inline boxes围绕元素排列。

从浮动的起因和浮动的实现后果来看，浮动不适合用于大范围的布局，更适合利用其特性实现一些小范围的流体布局效果。
