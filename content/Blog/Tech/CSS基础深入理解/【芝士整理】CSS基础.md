# CSS基础整合

## 选择器注意点

### 属性选择器

- [attr^=value] - 开头或全等
- [attr$=value] - 结尾或全等
- [attr*=value] - 包含值
- [attr~=value] - 字符串包含

### 选择器组

- A > B - 直接子节点
- A + B - 下一个兄弟节点
- A ~ B - 兄弟节点



## 优先级

!important > 内联样式 > ID选择器 > 属性选择器（类选择器，属性选择器，伪类）> 元素选择器 （类型选择器，伪元素）> 继承 > 用户代理样式

**通配选择符**(`*`), **关系选择符**(`+`, `>`, `~`, '` `')  和 **否定伪类**(`:not()`) 对优先级没有影响。（但是，在 **:not() 内部声明**的选择器是会影响优先级）。



## 块元素/行内元素/行内块元素

- block box - 整块，独占一行，可指定宽高
- inline box - 包裹内容，行内流动，文本太长会段落行中断开（设置border分行后的显示效果）；无法指定宽高
- inline-block box - 行内流动，段落行中不会断开，成块显示，可指定宽高



## 盒模型

当对一个文档进行布局的时候，浏览器渲染引擎会根据CSS-Box模型将所有元素表示为一个矩形盒子

盒模型由由外边距、边界、内边距、内容块组成

### **外边距**

盒模型的最外层，常用于元素外布局，垂直方向上易出现元素外边距重叠的效果，详细介绍可见[CSS深入理解之margin](https://segmentfault.com/a/1190000017321593)

### **边界**

背景层延伸到边界，默认颜色为字体颜色，可用边界实现一些常用图形效果，详细介绍可见[CSS深入理解之border](https://segmentfault.com/a/1190000017321786)

### **内边距**

内容区和边界之间的距离，背景层渗透，不支持负值，详细可见[CSS深入理解之padding](https://segmentfault.com/a/1190000017321634)

### **CSS-Box模型**

可通过box-sizing属性设置

- content-box ，标准盒子模型，width = 内容区宽度
- border-box，IE盒子模型，width = 内容区宽度 + 内边框 + 边框



## 行内框盒模型

行内框盒模型描述内容在元素中的布局结构

![](https://segmentfault.com/img/bVbkPRw?w=536&h=372)

行内元素都具有line-height和vertical-align属性，这两个属性影响内容在垂直方向上的分布，详细介绍可见[CSS深入理解之line-height](https://segmentfault.com/a/1190000017320243)以及[CSS深入理解之vertical-align](https://segmentfault.com/a/1190000017320618)



## 流布局

> 在普通流中，元素按照其在 HTML 中的先后位置至上而下布局，在这个过程中，行内元素水平排列，直到当行被占满然后换行，块级元素则会被渲染为完整的一个新行，除非另外指定，否则所有元素默认都是普通流定位，也可以说，普通流中元素的位置由该元素在 HTML 文档中的位置决定。



## 浮动

浮动起源于实现文字环绕效果。

为了实现文字环绕效果，规范规定的措施是使父容器塌陷，元素脱离文档流浮动产生BFC，元素周围的内容转换为inline boxes围绕元素排列。

从浮动的起因和浮动的副作用来看，浮动不适合用于大范围的布局，更适合利用其特性实现一些小范围的流体布局效果。

关于浮动的具体介绍，可见[CSS深入理解之float](https://segmentfault.com/a/1190000017318546)



## 定位

### **相对定位**

未脱离文档流，相对于元素在文档流中的位置偏移，不会对其他元素的布局产生影响

### **绝对定位**

脱离文档流，相对于包含块定位

绝对定位元素具有跟随性，在未手动定位时，元素根据原有位置脱离文档流放置

无固定宽/高，设定对立定位方向，产生拉伸效果

关于绝对定位的具体介绍，可以[CSS深入理解之absolute](https://segmentfault.com/a/1190000017320269)

### **固定定位**

脱离文档流，相对于视口



## BFC

### **什么是BFC?**

CSS规范的一个特性，产生BFC特性的元素可以理解为一个封闭独立的容器，能够排除一些外界因素的影响

### **如何产生BFC?**

- 根元素
- 浮动
- 绝对定位
- display: inline-block/table-cell/table-caption/flex/inline-flex
- overflow非visible

### **BFC的日常应用**

- 解决外边距重叠问题
- 清除浮动
- 排除兄弟元素的浮动影响

详细例子可见[10 分钟理解 BFC 原理](https://zhuanlan.zhihu.com/p/25321647)



## 层叠

![层叠顺序规则](https://image-static.segmentfault.com/110/990/1109906715-591d2f0490456_articlex)

详细介绍可见[CSS深入理解z-index](https://segmentfault.com/a/1190000017321497)



## 度量单位

- 绝对单位
  - px
- 相对单位
  - em - 相对父元素的字体大小（font-size而不是计算出的字体高度）
  - rem - 相对于基础字体大小，支持IE9及以上
  - `vw`, `vh`- 分别是视口宽度的1/100和视口高度的1/100



## 文本

### 文本溢出处理

#### 介绍几个属性

- **word-break**

  - normal：默认断行规则，CJK文本自动换行，非CJK不会自动换行（边界遇空白符会换行）
  - break-all：非CJK文本可在**任意字符**间断行
  - keep-all：CJK文本不断行，非CJK保持默认断行

- **word-wrap**

  overflow-wrap的别名，当行内没有多余的空间容纳一个单词到结尾，是否允许这个**单词**中断换行

  > 注：word-wrap 属性原本属于微软的一个私有属性，在 CSS3 现在的文本规范草案中已经被重名为 overflow-wrap 。 word-wrap 现在被当作 overflow-wrap 的 “别名”。 稳定的谷歌 Chrome 和 Opera 浏览器版本支持这种新语法。

  - normal
  - break-word

- **white-space**

  如何处理空白

  |            | 换行符 | 空格和制表符 | 文字转行 |
  | ---------- | ------ | ------------ | -------- |
  | `normal`   | 合并   | 合并         | 转行     |
  | `nowrap`   | 合并   | 合并         | 不转行   |
  | `pre`      | 保留   | 保留         | 不转行   |
  | `pre-wrap` | 保留   | 保留         | 转行     |
  | `pre-line` | 保留   | 合并         | 转行     |

- word-break控制任意字符是否换行，word-wrap控制单词是否中断换行，white-space可控制是否换行。如果无换行前提，word-space与word-wrap将失去意义。

  <iframe height='320' scrolling='no' title='word-break & word-wrap & white-space' src='//codepen.io/curlywater/embed/eQPYpY/?height=320&theme-id=0&default-tab=result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/curlywater/pen/eQPYpY/'>word-break & word-wrap & white-space</a> by Curly.Water (<a href='https://codepen.io/curlywater'>@curlywater</a>) on <a href='https://codepen.io'>CodePen</a>.
  </iframe>

#### 常见处理

1. 不做转换的情况下，显示多行文本，并且控制换行

   ```css
   .content {
       white-space: pre-wrap;
       word-wrap: break-word;
   }
   ```

2. 对溢出文本做省略字符处理

   ```
   .line-text {
       overflow: hidden;
     	text-overflow: ellipsis;
   }
   ```



### 行内元素水平间隔

行内元素之间若有空白符/换行符/制表符掺入，将会产生元素间隔的渲染效果

- 解决方式一：避免掺入，旧式开发中注意写法，现代框架和打包可以避免该问题
- 解决方式二：容器字体大小设置为0

```
html{
	// 字体大小不受设备终端调整
　　-webkit-text-size-adjust:none;
}
.container {
    font-size: 0;
}
.container span {
    font-size: 16px;
}
```





