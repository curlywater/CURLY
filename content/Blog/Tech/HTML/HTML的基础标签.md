---
description: 读一遍MDN文档后的个人总结，重点在于整理语义化标签的定义规范，记录各种部件容易被忽略的特性。
---

# HTML的基础标签

## 关于HTML

HTML的作用可以简单总结为结构化、语义化和提供基础API支持（HTML5）。

结构化，通过标签先后顺序和嵌套语法给DOM树提供基础。

语义化，语义化标签给内容正确的意思、作用和外形。合理使用语义化标签的意义在于贴合规则，这样信息更加容易被检索和利用，比如说可以辅助浏览器自动生成大纲、更容易让屏幕阅读器读出网页内容。

功能支持，基础的比如超链接、图片显示功能，HTML5中的音视频功能、矢量图、3D图像等等。



## 标签列表

基于个人理解（即非官方描述），给标签划分为结构化标签、语义化标签、功能化标签，文档标签。



### 结构化标签

不包含特定语义及功能

- div - 块级内容容器

- span - 内联内容容器

- br - 换行

- hr - 分隔线


### 语义化标签

包含特定语义，用户代理一般会给特殊样式表示，但无既定功能

- header - 页面的页眉或者一个节段的头部
- nav - 主要链接集合，footer里的附加链接集可以不用nav
- main - 文档的主体部分，一般是包含中心主题或主要功能的内容放置区
- article - 独立结构，可独立分配或可复用的内容结构，比如论坛帖子、评论
- section - 一个节段，一个专题组
- aside - 独立于主体内容的部分，比如说广告区，侧边栏
- footer - 页面的页脚，或一个阶段的尾部
- figure - 独立引用单元，比如引用图片，常和figcaption配合使用

- h1-h6 - 标题

- p - 文本段落

- ul+li - 无序列表

- ol+li - 有序列表

- dl+dt+dd - 描述列表，一个术语可有多条描述，多个术语也可共享同条描述。dl - description list, dt - description terms, dd - description description

  ```html
  <dl>
      <dt>Apple Inc.</dt>
      <dd>is an American multinational technology company</dd>
  </dl>
  ```

- em - 强调语气，默认样式为斜体

- strong - 着重强调，默认样式为粗体

- i - 应用在传统上用斜体表达的内容，比如说技术术语、外国文字之类的

- b - 应用在传统上用粗体表达的内容，比如说关键字、产品名称等

- u - 应用在传统上用下划线表达的内容，比如说拼写错误

- blockquote - 块引用，cite属性可表示引用源

- q - 行内引用，同有cite属性

- cite - 引文，如果引用源需要具体的文字显示，则需要这么使用

  ```html
  <a href="https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5"><cite>HTML5 是定义 HTML 标准的最新的版本</cite></a>
  ```

- abbr - 缩略语

  ```html
  <abbr title="People's Republic of China">PRC</abbr>
  ```

- address - 联系信息

  ```html
  <address>
      You can contact author at <a href="http://www.somedomain.com/contact">www.somedomain.com</a>.<br>
      If you see any bugs, please <a href="mailto:webmaster@somedomain.com">contact webmaster</a>.<br>
      You may also want to visit us:<br>
      Mozilla Foundation<br>
      1981 Landings Drive<br>
      Building K<br>
      Mountain View, CA 94043-0801<br>
      USA
  </address>
  ```



### 功能化标签

- a - 超链接

  ```HTML
  <a href="https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5" title="一篇关于HTML5的介绍">HTML5</a>
  ```

  - 相对URL和绝对URL的优劣：绝对URL需要查询DNS找到服务器再请求，相对URL则会根据当前服务器地址直接请求
  - URL可使用mailto链接直接出发邮件应用，mailto链接可加入一些邮件信息
  - 使用download属性可指定保存文件名

- img - 图片

  ```html
  <img src="tomato.png" alt="tomato.png" title="一张番茄的图片">
  ```

  和使用CSS背景图片比较，如果图像对内容有意义使用HTML，如果只是装饰使用背景图片

- video - 视频

  ```HTML
  <video src="videofile.ogg" autoplay loop muted controls poster="posterimage.jpg">
    抱歉，您的浏览器不支持内嵌视频，不过不用担心，你可以 <a href="videofile.ogg">下载</a>
    并用你喜欢的播放器观看! // 错误处理部分
  </video>
  ```

  浏览器包含了不同的解码器，所以需要用几个不同格式的文件来兼容不同的浏览器

  ```html
  <source src="video.mp4" type="video/mp4" />
  ```

  添加字幕文件

  ```html
  <video src="foo.ogg">
    <track kind="subtitles" src="foo.en.vtt" srclang="en" label="English">
    <track kind="subtitles" src="foo.sv.vtt" srclang="sv" label="Svenska">
  </video>
  ```

- audio - 音频

  没有poster, width, height属性，其他与video类似

- picture - 兼容多格式图片（比如webP的应用）的容器，支持自适应加载，edge13以上支持

  ```HTML
  <picture>
   <source srcset="mdn-logo.svg" type="image/svg+xml">
   <img src="mdn-logo.png" alt="MDN">
  </picture>
  
  <picture>
   <source srcset="mdn-logo-wide.png" media="(min-width: 600px)">
   <img src="mdn-logo-narrow.png" alt="MDN">
  </picture>
  ```

- iframe - 嵌入

  - sandbox属性 - 规定嵌入内容的工作权限，如表单提交、脚本运行，兼容性：IE9以上
  - seamless属性 - iframe渲染成容器页面文档的一部分，兼容性：IE/Edge未实现
  - srcdoc属性 - HTML代码，显示在iframe中的HTML内容，兼容性：IE/Edge未实现
  - scrolling属性 - yes/no/auto，在iframe中如何显示滚动条

  `<embed><object>`用于嵌入pdf/flash格式的内容

- svg - 矢量图

  SVG文件中包含图形和路径的定义，由CPU计算出渲染结果，使用过多或者过大的SVG会导致性能阻塞

- table - 表格

  - caption - 表格标题
  - thead/tbody/tfooter - 表格容器
  - colgroup+col - 为列统一设置样式
  - tr - 行
  - th - 标题格
  - td - 单元格

- form - 表单

  - fieldset - 具有相同目的的小部件组

    - legend - 部件组标题

  - label - 小部件标签。通过for属性和小部件绑定，点击label时小部件也被激活。

    ```html
    <label for="name">Name:</label>
    <input id="name" type="text" name="name" />
    
    // 标签内容跨越小部件时，可以用label包裹
    <div>
      <label for="username">
        <span>Name:</span>
        <input id="username" type="text" name="username">
        <abbr title="required">*</abbr>
      </label>
    </div>
    ```

  - input - 单行输入框

    - readonly属性规定无法输入，disabled属性禁止一切行为form表单数据中会剔除该部件数据。
    - type属性，email/password/search/tel/url/number/range/color/date/hidden/radio/checkbox/file

  - select + option - 下拉选择器

    ```html
    <select id="simple" name="simple">
      <option>Banana</option>
      <option>Cherry</option>
      <option>Lemon</option>
    </select>
    
    // optgroup增加选框标题
    <select id="groups" name="groups">
      <optgroup label="fruits">
        <option>Banana</option>
        <option selected>Cherry</option>
        <option>Lemon</option>
      </optgroup>
      <optgroup label="vegetables">
        <option>Carrot</option>
        <option>Eggplant</option>
        <option>Potato</option>
      </optgroup>
    </select>
    ```

  - datalist - 自动补全选择器

    兼容性：IE10以下不受支持，Safari不支持

    ```html
    <input type="text" list="autoCompleteList">
    <datalist id="autoCompleteList">
        <options>Mac OS</options>
        <options>Windows</options>
        <options>Linux</options>
    </datalist>
    ```



### 文档标签

- `<!DOCTYPE html>`  - 声明文档类型，规定页面需要遵循的规则

- `<meta>` - 描述文档的数据

  - `<meta charset="utf-8">` - 文档字符编码，描述在这个文档中允许被使用的字符集
  - `<meta name="description" content="This is a page..."` - name部分规定描述的信息类型，content部分规定描述的信息内容
  - 一些站点设定有专用的元数据协议会在其站点内显示特定信息，比如说Facebook的Open Graph Data

- `<link>` - 指定外部资源，并规定外部资源与当前文档的关系

  ```html
  <link ref="{关系}" href="{资源URI}" type="{资源内容类型}">
  <link ref="shortcut icon" href="favicon.ico" type="image/x-icon">
  <link rel="preload" href="https://developer.mozilla.org/static/fonts/locales/ZillaSlab-Regular.subset.bbc33fb47cf6.woff2" as="font" type="font/woff2" crossorigin="">
  ```



### 附录

[HTML5 标签列表 - From MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5/HTML5_element_list)