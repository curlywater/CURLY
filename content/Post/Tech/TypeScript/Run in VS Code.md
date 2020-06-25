# 在VS Code中使用TypeScript

## VS Code对TS的支持

VS Code提供TS语言支持，包括语法高亮、智能补全、错误检查、Quick Fixes功能。

VS Code并不提供TS运行时和编译环境，但提供TS调试支持。那么如何在VS Code中把TS代码跑起来呢？



## 在VS Code中运行TS代码

### 官方方案

#### 简单介绍

**`tsc` + Node.js**：`tsc`编译，Node.js执行

- 安装`typescript`依赖
- `tsc`命令编译ts文件
- `node`命令执行生成的js文件

#### 编译配置

可自定义`workspace`下的`tsconfig.json`

``` json
// tsconfig.json 示例
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs，
    "outDir": "out",
    "sourceMap": true
  }
}
```

#### Build Task - 摆脱命令行

如果已创建`tsconfig.json`（没有内容也可以），VS Code会自动检测出`tsc:build`和`tsc:watch`两个Build Task，**Run Build Task** (⇧⌘B) 便能得到执行编译的快捷入口。

自定义Build Task，实质上是配置`workspace`下`.vscode`目录內的`task.json`。

进入自定义Build Task模式的方式：

- ⇧⌘P -> **Configure Default Build Task**
- ⇧⌘B -> 选择某一项的配置

#### 隐藏生成的JavaScript文件

编译生成的js文件被默认安置在同一目录，依赖这一特点做一些配置，轻松避免无关文件干扰

⇧⌘P -> **Preferences: Open Workspace Settings** -> files.exclude 添加规则：

```json
`**/*.js: { "when": "$(basename).ts" }
```

👆这个pattern在说：“请隐藏目录下存在同名ts的js文件吧”

#### 调试

VS Code支持通过内建的Node.js debugger调试TS，也可以通过[Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)插件调试客户端环境下的TS

前提是在`tsconfig.json`中开启`source map`，以支持在VS Code中调试源码

#### 调试配置

``` json
{
  // Node.js launch.json 示例
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "program": "${workspaceFolder}/helloworld.ts",
      "preLaunchTask": "tsc: build - tsconfig.json",
      "outFiles": ["${workspaceFolder}/out/**/*.js"]
    }
  ]
}
```

``` json
{
  // Client-side launch.json 示例
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "file:///C:/Users/username/deleteMe/HelloWeb/helloweb.html",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```



### 民间方案

#### 简单介绍

**Deno + Code Runner**：Deno提供TS运行时，搭配上[Code runner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner)快捷执行代码

- 安装[Deno](https://deno.land/#installation)

- 配置`code-runner.executorMap`

  ``` json
  {
      "code-runner.executorMap": {
          "typescript": "deno run"
      }
  }
  ```

####调试

由于Deno支持V8 Inspector Protocol，对口的载体都有能力支持Deno代码调试，比如Chrome Devtool和VS Code

Deno提供`--inspect`和`--inspect-brk`两个标识激活`debug`功能

``` json
{
  // launch.json
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Deno",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "deno",
      "runtimeArgs": ["run", "--inspect-brk", "-A", "<entry_point>"],
      "port": 9229
    }
  ]
}
```

**用实际的执行文件替换`<entry_point>`**



参考文章：

https://code.visualstudio.com/docs/typescript/typescript-tutorial

https://deno.land/manual/tools/debugger#vscode