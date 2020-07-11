# CSS深入理解之vertical-align

## vertical-align的值

- 线类：baseline, top, bottom, middle
- 文字类：text-top, text-bottom
- 上标下标类：sub, super
- 数值：1px, 1em - 在baseline对齐的基础上上下偏移一定数值
- 百分比：相对于line-height计算

## vertical-align起作用的前提

只作用于inline水平元素以及'table-cell'元素

注意：float和position: absolute会使元素块状化

## vertical-align与line-height

- inline元素都有vertical-align和line-height，vertical-align默认为baseline

  要使inline元素对齐，可以用以下方法：

  1. 清除vertical-align
     1. 修改vertical-align值
     2. 元素block化
  2. line-height为0
     1. 设置line-height为0
     2. line-height为数值的情况下，可以设置font-size为0

  <p data-height="265" data-theme-id="0" data-slug-hash="BGgPby" data-default-tab="css,result" data-user="curlywater" data-pen-title="Demo: vertical-align" class="codepen">See the Pen <a href="https://codepen.io/curlywater/pen/BGgPby/">Demo: vertical-align</a> by Curly.Water (<a href="https://codepen.io/curlywater">@curlywater</a>) on <a href="https://codepen.io">CodePen</a>.</p>
  <script async src="https://static.codepen.io/assets/embed/ei.js"></script>

- inline-block的基线是inline-block内最后一个line box的基线；如果inline-block内没有line box或者其本身的overflow不为visible，基线是自身的margin底边缘。

  <p data-height="265" data-theme-id="0" data-slug-hash="LXKJyv" data-default-tab="js,result" data-user="curlywater" data-pen-title="Demo: inline-block & baseline" class="codepen">See the Pen <a href="https://codepen.io/curlywater/pen/LXKJyv/">Demo: inline-block & baseline</a> by Curly.Water (<a href="https://codepen.io/curlywater">@curlywater</a>) on <a href="https://codepen.io">CodePen</a>.</p>
  <script async src="https://static.codepen.io/assets/embed/ei.js"></script>

  上例中，左边盒子的基线为其底边缘，右边盒子的基线为line box的基线；

  将右边盒子的行高设置为0，即baseline这个line box的高度为0，位置处于content area中间。

## 线类属性值

- bottom

  1. inline|inline-block元素：元素底部和父级底部对齐
  2. table-cell元素：底padding边缘和table-row底部对齐，多余部分padding填充

- top

  1. inline|inline-block元素：元素顶部和父级顶部对齐
  2. table-cell元素：顶padding边缘和table-row顶部对齐，多余部分padding填充

- middle

  1. inline|inline-block元素：元素的垂直中心点和父元素基线上的1/2 x 高度处对齐，也就是x的中心点

     使用vertical-align:middle只是近似垂直居中，因字符有下沉的特性，所以x的中心点是低于容器实际中心线的，字体较小的情况下肉眼看不出区别而已

     <p data-height="265" data-theme-id="0" data-slug-hash="bQPmpv" data-default-tab="result" data-user="curlywater" data-pen-title="Demo: vertical-align middle" class="codepen">See the Pen <a href="https://codepen.io/curlywater/pen/bQPmpv/">Demo: vertical-align middle</a> by Curly.Water (<a href="https://codepen.io/curlywater">@curlywater</a>) on <a href="https://codepen.io">CodePen</a>.</p>
     <script async src="https://static.codepen.io/assets/embed/ei.js"></script>

  2. table-cell元素：table-cell元素的高度有table-row中最高的那一个单元格决定，内容未撑满高度时，使用padding填充

## 文本类属性值

- text-top：元素顶部和父级content area的顶部对齐
- text-botton：元素底部和父级content area的底部对齐

只与父级的font-size有关，与父级line-height无关，与兄弟元素的line-height无关

## 上标下标类属性值

- super：提高元素的基线到父级的上标基线位置
- sub：降低元素的基线到父级的下标基线位置

## 相邻元素不同vertical-align的行为表现

关注自身和父级，前后元素并没有影响

## vertical-align的应用

行内元素绝对垂直居中

<p data-height="265" data-theme-id="0" data-slug-hash="jQgwxP" data-default-tab="css,result" data-user="curlywater" data-pen-title="Demo: vertical-align middle" class="codepen">See the Pen <a href="https://codepen.io/curlywater/pen/jQgwxP/">Demo: vertical-align middle</a> by Curly.Water (<a href="https://codepen.io/curlywater">@curlywater</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

1. 容器指定高度
2. 需要居中的行内元素设置inline-block，vertical-align: middle
3. 加一个与容器高度相同，vertical-align: middle，的inline-block元素

