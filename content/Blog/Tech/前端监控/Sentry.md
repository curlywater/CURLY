# Sentry

## 前端代码实例

```bash
npm install --save @sentry/browser
```

```javascript
import Sentry from "@sentry/browser";
Sentry.init({
  dsn: 'https://<key>@sentry.io/<project>',
	environment: "dev"
});
```

## 初始化配置

```js
Sentry.init({
  dsn: 'https://<key>@sentry.io/<project>', // 发送事件的目标地址，对应SENTRY_DSN环境变量
  debug: Boolean, // 指定是否打印Sentry发送异常相关的错误信息
  release: String, // 指定代码版本号，与git集成、sourceMap相关，对应SENTRY_RELEASE环境变量
  environment: String, // 指定监控环境。以便在后台分环境查看，非特定字符串可随意设置。对应SENTRY_ENVIRONMENT环境变量
  sampleRate: Number, // 指定事件采样率，范围在0.0 ~ 1.0。如果设置0.1，随机挑选10%的事件发送。
  maxBreadcrumbs: Number, // 指定应捕获的面包屑总量，默认值是100。使用方式？
  attachStacktrace: Boolean, // 指定堆栈跟踪是否附加到消息，默认不附加。使用方式？
  blacklistUrls: [String|RegExp], // 指定黑名单，错误的URL匹配名单将不会发送。使用方式？
  whitelistUrls: [String|RegExp], // 指定白名单，错误的URL匹配名单将被发送到Sentry。使用方式？
  integrations: Array, // 在库初始化时配置集成
  defaultIntegrations: Boolean, // 是否添加默认集成
  beforeSend: Function(eventObject, hint){return eventObject}, // 发送事件前的钩子，可对eventObject做一些定制，返回eventObject或者返回null阻止事件发送
	beforeBreadcrumb: Function(breadCrumb, hint){return breadCrumb} // 添加面包屑前的钩子，可对面包屑做一些定制
});
```

## 错误数据

### 上下文Context

- 结构化上下文 - OS信息，运行时信息
- User - 用户相关信息
- Tags - 标签，会被加入索引，用于筛选事件
- Level - 事件评级
- Fingerprint - 事件分组用
- 额外上下文 - 自定义其他信息

关于各种数据的大小限制：https://docs.sentry.io/development/sdk-dev/data-handling/

#### 捕获用户

```js
Sentry.configureScope((scope) => {
  scope.setUser({"email": "john.doe@example.com"});
});
```

必须选择以下属性中的一个作为用户唯一标识

- id
- username
- email
- Ip_address

#### 自定义标签

```js
Sentry.configureScope((scope) => {
  scope.setTag("page_locale", "de-at");
});
```

#### 设置Level

```js
Sentry.configureScope((scope) => {
  scope.setLevel('warning');
});
```

level的可选值：'fatal'，'error'，'warning'，'info'和'debug'，默认值为error

#### 自定义额外值

```js
Sentry.configureScope((scope) => {
  scope.setExtra("character_name", "Mighty Fighter");
});
```

### 环境Environments

dev / staging / production 

### 面包屑Breadcrumbs

面包屑包含的属性

- message - String，描述基本信息
- data - 元数据映射，附加的键值对信息
- category - 标记事件类别
- level - 'fatal'，'error'，'warning'，'info'和'debug'
- type - 'default', 'http', 'default'，影响视觉效果，作为半内部属性数据处理逻辑上会有依赖，最好不要修改

#### 增加面包屑

```js
Sentry.addBreadcrumb({
  category: 'auth',
  message: 'Authenticated user ' + user.email,
  level: Sentry.Severity.Info
});
```

### 收集用户反馈

Sentry默认控件

```js
Sentry.init({
    dsn: 'https://<key>@sentry.io/<project>',
    beforeSend(event, hint) {
      // Check if it is an exception, and if so, show the report dialog
      if (event.exception) {
        Sentry.showReportDialog({ eventId: event.event_id });
      }
      return event;
    }
  });
```

自定义组件 + sentry Api

https://docs.sentry.io/platforms/javascript/react/

https://docs.sentry.io/api/projects/post-project-user-reports/

### Scope

捕获事件并将其发送到Sentry时，SDK会将该事件数据与当前范围中的额外信息合并。

```js
Sentry.configureScope((scope) => {
  scope.setTag("my-tag", "my value");
  scope.setUser({
    id: 42,
    email: "john.doe@example.com"
  });
});
```

```js
Sentry.withScope(scope => {
  scope.setTag("my-tag", "my value");
  scope.setLevel('warning');
  Sentry.captureException(new Error('my error'));
});
```

Sentry.configureScope 全局配置，一次设置影响后续

Sentry.withScope 局部配置，只在当前有效

### Tracing

连接应用服务端和Sentry服务

