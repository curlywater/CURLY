# CSS经典布局

## 水平居中

### 行内元素

*text-align*

```css
.parent {
    text-align: center;
}
```



### 定宽块元素

#### 常规流中

*margin: 0 auto;*

```css
.child {
    width: 200px;
    margin: 0 auto;
}
```

#### 浮动块元素

*relative + 负边距*

```css
.child {
    width: 200px;
    float: left;
    position: relative;
    left: 50%;
    margin-left: -100px;
}
```

#### 绝对定位元素

*负边距居中*

```css
.parent {
    position: relative;
}
.child {
	width: 200px;
    position: absolute;
    left: 50%;
    margin-left: -100px;
}
```

*绝对居中*

```css
.parent {
    position: relative;
}
.child {
    width: 200px;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
}
```



### 不定宽块元素

*inline-block + text-align*

```css
.parent{
    text-align: center;
}
.child{
    display: inline-block;
}
```

*transform*

```css
.parent {
    position: relative;
    height: 300px;
}
.child {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
```

*flexbox*

```css
.parent {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
```

*table + margin:auto*

```css
.parent {
    display: table;
  	margin: 0 auto;
}
```

*table-cell + text-align*

```css
.table {
  display: table;
  width: 100%;
}
.table-cell {
  display: table-cell;
  text-align: center;
}
```



PS: 完整Demo - https://codepen.io/curlywater/pen/zyGVrm



## 垂直居中

### 单行

*line-height和height一致*

```css
.child {
    height: 100px;
    line-height: 100px;
}
```



### 定高块元素

*负边距居中*

```css
.parent {
    position: relative;
}
.child {
	width: 200px;
    position: absolute;
    top: 50%;
    margin-top: -100px;
}
```

*绝对居中*

```css
.parent {
    position: relative;
}
.child {
    width: 200px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
}
```



### 不定高块元素

*transform*

```css
.parent {
    position: relative;
    height: 300px;
}
.child {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}
```

*flex*

```css
.parent {
    display: flex;
    align-items: center;
    height: 300px;
}
```

*table-cell + vertical-align*

```css
.parent {
    display: table-cell;
  	vertical-align: middle;
  	height: 300px;
}
```



PS: 完整Demo - https://codepen.io/curlywater/pen/REPXLx



## 水平垂直居中

### 行内元素

*text-align: center + line-height一致 + vertical-align: middle* （近似居中）

```css
.parent {
    text-align: center;
    line-height: 300px;
    height: 300px;
    text-align: center;
}
.child {
    vertical-align: middle;
}
```



### 定高定宽块元素

*负边距居中*

```css
.parent {
    position: relative;
}
.child {
	width: 200px;
	height: 200px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -100px;
    margin-top: -100px;
}
```

*绝对居中定位*

```css
.parent {
    position: relative;
}
.child {
    width: 200px;
    height: 200px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}
```



### 不定块元素

*transform*

```css
.parent {
    position: relative;
}
.child {
    position: absolute;
    top: 50%;
    bottom: 50%;
    transform: translate(-50%, -50%);
}
```

*flex*

```css
.parent {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

*table-cell + text-align + vertical-align*

```css
.parent {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}
.child {
    display: inline-block;
}
```



PS: 完整Demo - https://codepen.io/curlywater/pen/JwYBjm



## 上下布局

*calc()*

```css
.header {
    height: 200px;
}
.content {
    height: calc(100% - 200px);
}
```

*content absolute*

```css
.header {
    height: 200px;
}
.content {
    position: absolute;
    width: 100%;
    top: 200px;
    bottom: 0;
}
```

*header absolute*

```css
.content {
    height: 100%;
    padding-top: 100px;
    box-sizing: border-box;
}
.header {
    position: absolute;
    height: 100px;
    width: 100%;
}
```

*flex*

```css
.container {
    display: flex;
    flex-direction: column;
}
.content {
    flex: 1;
}
```

*table*(table-row里需要有内容)

```css
.container {
    display: table;
}
.header, .content {
    display: table-row;
}
```



PS: 完整Demo - https://codepen.io/curlywater/pen/ebpjxQ



## 左右布局

*float + margin*

```css
.left {
    width: 200px;
    float: left;
}
.right {
    margin-left: -200px;
}
```

*float + BFC*（左右两边都可自适应）

```css
.left {
    float: left;
}
.right {
    overflow: auto;
}
```

PS: 完整Demo - https://codepen.io/curlywater/pen/PXPdzJ



## 左中右布局

*left + right + margin*（注意DOM节点顺序）

```css
.left {
    float: left;
    width: 100px;
}
.right {
    float: right;
    width: 200px;
}c
.main {
	margin-left: 100px;
	margin-right: 200px;
	height: 100%;
}
```

float + BFC

```css
.left {
    float: left;
 	width: 100px;
}
.right {
    float: right;
    width: 200px;
}
.main {
    overflow: auto;
    height: 100%;
}
```

圣杯

https://codepen.io/curlywater/pen/xmGmqO

双飞翼

https://codepen.io/curlywater/pen/ZVGVez

flex

```css
.container {
    display: flex;
}
.main {
    flex: 1;
}
```

table

```css
.container{
    display: table; 
    width: 100%;
    table-layout: fixed;
}
.left,.main,.right{
    display: table-cell;
}
.main {
    width: 100%;
}
```

https://codepen.io/curlywater/pen/WLQgRK



## 等高

*padding + margin*

```
.container {
  overflow: hidden;
  .left,
  .right {
    padding-bottom: 9999px;
    margin-bottom: -9999px;
  }
  .left {
    float: left;
    width: 300px;
    background: #333;
    color: #fff;
  }
  .right {
    overflow: hidden;
  }
}
```

border

```css
.container {
  border-left: 300px solid #333;
  .left {
    float: left;
    margin-left: -300px;
    color: #fff;
  }
  .right {
    height: 100%;
  }
}
```

table

```css
.container {
  display: table;
  width: 100%;
  .left, .right {
    display: table-cell;
  }
  .left {
    width: 300px;
    background: #333;
    color: #fff;
  }
}
```

flex

```css
.container {
  display: flex;
  .left {
    width: 300px;
    background: #333;
    color: #fff;
  }
}
```

https://codepen.io/curlywater/pen/VqvGQb



## 等分

百分比

```css
.container {
    margin-left: -20px;
    font-size: 0;
}
.item {
    width: 25%;
    padding-left: 20px;
    display: inline-block;
    box-sizing: border-box;
}
```

flex

```css
.container {
    display: flex;
}
.item {
    flex: 1;
}
.item + .item {
    margin-left: 20px;
}
```