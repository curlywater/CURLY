# CSS深入理解之relative

## relative对绝对定位元素的限制

- 限制定位
- 限制层次
- 限制overflow，overflow原本对绝对定位元素无效，容器设置relative+overflow的情况下生效

## relative的定位特性

- 相对于自身
- 无侵入，不会对其他元素的布局产生影响
- top与bottom、left与right同时存在时，忽视bottom、right

## relative的层叠特性

- 可以提高层叠上下文
- z-index为具体数值时，限制内部绝对定位元素层叠
- z-index为auto时，不限制内部绝对定位元素层叠