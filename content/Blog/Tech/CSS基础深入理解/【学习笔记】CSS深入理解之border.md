# CSS深入理解之border

## border-width

border-width不支持百分比，原因是边框本身具有宽度固定的意义，不同设备的边框不会因设备宽度而等比改变。因此从语义上来说，边框支持百分比毫无意义。text-shadow/box-shadow/outline也有相同语义

border-width的默认标识为medium，因为border-style为double时支持的最小宽度为3px

## border-style

- solid - 一条实线

- dashed - 在Chrome/Firefox 和 IE 上渲染效果有宽高比区别，适合单纯作为虚线框使用

- dotted - 在Chrome/Firefox上实线部分以方格图案展示，IE上实线部分以圆展现。可利用该特性在IE8上实现圆角

- double - 由两条实线和一条虚线组成，实线宽度相等，虚线宽度为总宽度-实线宽度*2。可利用该特性实现菜单效果

  <p data-height="265" data-theme-id="0" data-slug-hash="aQMBYq" data-default-tab="css,result" data-user="curlywater" data-pen-title="Demo - menu icon by double border" class="codepen">See the Pen <a href="https://codepen.io/curlywater/pen/aQMBYq/">Demo - menu icon by double border</a> by Curly.Water (<a href="https://codepen.io/curlywater">@curlywater</a>) on <a href="https://codepen.io">CodePen</a>.</p>
  <script async src="https://static.codepen.io/assets/embed/ei.js"></script>

- 其他3D效果兼容性不佳，谨慎使用

## border-color

在未设置border-color时，会color作为边框色，border-color不会继承。text-shadow/box-shadow类似。

可以利用该特性实现图标hover变色的效果

<p data-height="265" data-theme-id="0" data-slug-hash="yQwVxM" data-default-tab="css,result" data-user="curlywater" data-pen-title="Demo: add icon by border-color" class="codepen">See the Pen <a href="https://codepen.io/curlywater/pen/yQwVxM/">Demo: add icon by border-color</a> by Curly.Water (<a href="https://codepen.io/curlywater">@curlywater</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>	

## border与background定位

background-position不计算border区域，只限于padding以内的盒子。可以利用这一特性实现背景图片距离容器右侧定位

## border与三角等图形构建

利用border相交会产生边缘等分的内嵌效果，可以实现三角、梯形等图形构建

<p data-height="650" data-theme-id="0" data-slug-hash="zMbNNm" data-default-tab="js,result" data-user="curlywater" data-pen-title="Demo: border drawing" class="codepen">See the Pen <a href="https://codepen.io/curlywater/pen/zMbNNm/">Demo: border drawing</a> by Curly.Water (<a href="https://codepen.io/curlywater">@curlywater</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

常见的应用

<p data-height="265" data-theme-id="0" data-slug-hash="vQPgpN" data-default-tab="css,result" data-user="curlywater" data-pen-title="Demo - border apply" class="codepen">See the Pen <a href="https://codepen.io/curlywater/pen/vQPgpN/">Demo - border apply</a> by Curly.Water (<a href="https://codepen.io/curlywater">@curlywater</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## border与透明边框

- 边框使用box-shadow，原先border变透明来增加点击区域
- 使用背景透明的图片+drop-shadow实现图标颜色修改：相对定位向左偏移，设置右边框，外部容器使用overflow:hidden隐藏原始图标

## border与布局

border实现等高布局

- 与padding和margin对比的优势
- 局限：不支持百分比，只可左边区域根据右边区域变化

<p data-height="265" data-theme-id="0" data-slug-hash="OaqOpX" data-default-tab="html,result" data-user="curlywater" data-pen-title="Demo: border与等高布局" class="codepen">See the Pen <a href="https://codepen.io/curlywater/pen/OaqOpX/">Demo: border与等高布局</a> by Curly.Water (<a href="https://codepen.io/curlywater">@curlywater</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

