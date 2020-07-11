# CSS深入理解之padding

## padding与容器的尺寸

- block元素
  - padding值过大，一定影响元素尺寸
  - width为定值，padding会影响元素尺寸
  - width为auto或者box-sizing为border-box，同时padding值没有暴走，不影响元素尺寸
- inline元素：水平padding影响尺寸，垂直padding不影响尺寸，但是会影响占据空间（会显示背景色）

## padding负值与百分比单位

- padding不支持负值
- padding百分比相对于自身宽度计算
- inline元素的padding有断行效果
- 空的inline元素padding高宽不相等，因为inline的垂直padding会让隐匿文本节点出现

## 标签元素的内置padding

### ol/ul

1. ol/ul元素内置padding-left，单位是px不是em
2. 间距固定，字号过小显得间距过大，字号过大会溢出容器

### radio/checkbox

无法设置padding

### button

- FireFox下清空按钮padding

```
button::-moz-focus-inner {
    padding: 0; 
}
```

- FireFox下按钮高度计算问题，导致不兼容问题，所以一般使用自定义按钮