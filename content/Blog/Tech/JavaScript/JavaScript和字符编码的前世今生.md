# JavaScript和字符编码的前世今生

## 字符集

- ASCII - 基于拉丁字母的字符集，包含128个字符，ASCII表

- 包含世界性字符的超大集合

- UCS(Universal Character Set) - [国际标准化组织（ISO）](https://en.wikipedia.org/wiki/International_Organization_for_Standardization)制定的通用编码字符集，1990年推出编码规则UCS-2

- Unicode - [统一码联盟](https://en.wikipedia.org/wiki/Unicode_Consortium)制定的Uni系标准

- 1991，两个组织合并字符集，最终以Unicode流传

- Unicode - 用一个码点(code point)映射一个字符，码点值的范围是从U+0000到U+10FFFF，可以表示超过110万个符号。

- Unicode平面，从U+0000到U+FFFF，基本平面BMP。其余16个平面

- 编码规则 UTF-32，**四个字节**表示一个码点

  > ```javascript
  > U+0000 = 0x0000 0000
  > 
  > U+597D = 0x0000 597D
  > ```

  - 缺点：空间浪费

## 转换编码

UTF（Unicode transformation format）Unicode转换格式，是服务于Unicode的，用于将一个Unicode码点转换为特定的字节序列。

- UTF-8 - **UTF-8是一种变长的编码方法，字符长度从1个字节到4个字节不等。**越是常用的字符，字节越短，最前面的128个字符，只使用1个字节表示，与ASCII码完全相同。

- UTF-16 - 对于BMP的码点，采用2个字节进行编码；而BMP之外的码点，用4个字节组成代理对（surrogate pair）来表示。其中前两个字节范围是U+D800到U+DBFF，后两个字节范围是U+DC00到U+DFFF，通过以下公式完成映射（H：高字节 L：低字节 c：码点） **这四个字节必须放在一起解读。**

  H = Math.floor((c-0x10000) / 0x400)+0xD800 

  L = (c – 0x10000) % 0x400 + 0xDC00

  /[\uD800-\uDBFF][\uDC00-\uDFFF]/g; // 匹配UTF-16的代理对

- UCS-2 - 2个字节(16位)表示BMP，表现上来说可以理解为UTF-16的一个子集



## JavaScript的字符编码

引擎使用UTF-16存储字符

JavaScript语言使用编码规则：UCS-2 

- 一个字符两个字节
- 4个字节的字符怎么办？会当作两个双字节的字符处理

![img](http://www.ruanyifeng.com/blogimg/asset/2014/bg2014121120.png)



### 坑

#### length

> for (var i in string) {...}

> '👅'.length // 2

应用：limit...

#### 字符串操作

> - String.prototype.replace()
> - String.prototype.substring()
> - String.prototype.slice()
> - String.prototype.split('').reverse().join('')
> - String[index]

#### 码点与字符

> '𝌆' === '\u1D306'

> String.fromCharCode(0x0041)
>
> 'A'
>
> String.fromCharCode(0x1F4A9)
>
> '' // U+F4A9, not U+1F4A9

> String.fromCharCode(0xD83D, 0xDCA9)
>
> '💩'.charCodeAt(0)

#### 正则匹配

- 正则匹配符`.`只能匹配单个“字符”

  > /^.$/.test('💩'); 

- > /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/



## ES6

### length

> for ( var s of string) {...}
>
> Array.from(string).length

- `for(...i++;...)...str[i`]: 按`charCodeAt()`进行循环
- `for…in`: 按`charCodeAt()`进行循环
- `for…of`: 按`codePointAt()`进行循环

### 字符串操作

> Array.from(string) 支持代理对解析
>
> String.prototype.at(index)

### 码点与字符

> '𝌆' === '\u{1D306}'

> String.fromCodePoint(0x1F4A9)

> '💩'.codePointAt(0)

### 正则匹配

> /^.$/u.test('💩')



## Emoji

Unicode规定Emoji的码点和含义，具体样式由系统自己实现

### Unicode编码版本

### 单色与彩色

- ⚠︎(U+26A0 + U+FE0E)
- ⚠️(U+26A0 + U+FE0F)

### 肤色

👃🏿 = 👃(U+1F443) + 🏿(U+1F3FF)

> '👃🏿'.length // 4

### 组合

“零宽连接符**”(“Zero-width joiner，即ZWJ”)：U+200D

> "👨‍👩‍👧" === '\u{1F468}\u{200d}\u{1F469}\u{200d}\u{1F467}'



## 字符编码相关方法

### escape/unescape

除非转义字符（字母数字以及-_.!~*'()）

编码为Unicode字符

已经从 Web 标准中删除

### encodeURI/decodeURI

除保留字符（;,/?:@&=+$#），非转义字符（字母数字以及-_.!~*'()）

编码为UTF-8

### encodeURIComponent/decodeURIComponent

除非转义字符（字母数字以及-_.!~*'()）

编码为UTF-8

#### 拼接URL时使用encodeURIComponent的原因

> encodeURIComponent('𝌆') // %F0%9D%8C%86
>
> '𝌆' // \ud834\udf06

### btoa/atob

atob: ascii to binary

btoa: binary to ascii

二进制转换为base64编码

base64编码: 8Bit字节码的编码，64个字符



#### 超越ascii字符集限制

```js
function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}

b64EncodeUnicode('✓ à la mode'); // "4pyTIMOgIGxhIG1vZGU="
```

```javascript
function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

b64DecodeUnicode('4pyTIMOgIGxhIG1vZGU='); // "✓ à la mode"
b64DecodeUnicode('Cg=='); // "\n"
```



#### 在URL中使用

ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=

为解决此问题，可采用一种用于URL的改进Base64编码，它不在末尾填充’=’号，并将标准Base64中的“+”和“/”分别改成了“-”和“_”，这样就免去了在URL编解码和数据库存储时所要作的转换，避免了编码信息长度在此过程中的增加，并统一了数据库、表单等处对象标识符的格式。