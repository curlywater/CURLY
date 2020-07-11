# HTML5新功能

1. Web Worker
2. History API
3. 拖放：模拟Trello
4. window.requestAnimationFrame()
5. Canvas：图形绘制，动画，游戏，避免dom结点重绘导致的问题。Demo生成图片
6. WebGL
7. 本地离线存储:
   - sessionStorage - 以字符串形式键值对格式，临时保存数据，窗口/标签页关闭之后销毁
   - localStorage - 以字符串形式键值对格式，永久保存，除非手动remove或者clear；同步保存
   - indexeddb - 使用索引实现提高数据搜索性能，适用于大量结构化数据存储；异步操作
8. navigator.geolocation
9. SVG的使用
   - 作为图片使用，需要请求资源，并且节点不可控制
   - 内联SVG，可控制节点，但有重用问题
   - svg sprite，symbol + use，可复用，可修改样式，但节点不可控

