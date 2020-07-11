# Sentry文档整理

## 用户结构

Organization -> Members -> Team -> Projects

Owner -> Manager -> Admin -> Member

组织的所有者 -> 组织的管理员 -> 高级用户 -> 普通用户



## 概念

event - 上传到监控后台的事件

issue - 归并同类event -> issue

breadcrumb - 某个事件触发的路径，它会记录事件触发前触发的一些列事件。通常Sentry会自动搜集记录这些事件，比如异常发生之前的点击事件等。可以自定义路径



## 初始化配置

```js
Sentry.init({
  dsn: 'https://<key>@sentry.io/<project>',
  maxBreadcrumbs: 50,
  debug: true
})
```



dsn: 发送目的地

debug: 是否在控制台显示上传错误的信息，一般不开启，在生产环境下开启不会有安全问题

Release: 发布版本，最好和代码发布版本保持一致，和部署集成或sourcemap保持同步

environment: string, prod/dev/staging，在管理后台区分当前环境

sampleRate: 采样率，定义事件上传频率， If set to 0.1 only 10% of events will be sent. Events are picked randomly.默认1.0

maxBreadcrumbs: 应获取的面包屑总量



## Hooks

beforeSend

```js
Sentry.init({
  beforeSend(event) {
    // Modify the event here
    if (event.user) {
      // Don't send user's email address
      delete event.user.email;
    }
    return event;
  }
});
```

beforeBreadcrumb

```js
import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: 'https://<key>@sentry.io/',
  beforeBreadcrumb(breadcrumb, hint) {
    if (breadcrumb.category === 'ui.click') {
      const { target } = hint.event;
      if (target.ariaLabel) {
        breadcrumb.message = target.ariaLabel;
      }
    }
    return breadcrumb;
  },
});
```



## 捕获

Sentry.captureException

```js
try {
    aFunctionThatMightFail();
} catch (err) {
    Sentry.captureException(err);
}
```

Sentry.captureMessage

```js
Sentry.captureMessage('Something went wrong');
```



## Contexts

```js
Sentry.configureScope((scope) => {
  scope.setUser(
	{
		id: "",
		username: "",
		email: "john.doe@example.com",
		ip_address: ""
	}
	scope.setTag("page_locale", "de-at");
  scope.setLevel('warning'); //‘fatal’, ‘error’, ‘warning’, ‘info’, and ‘debug’. (‘error’ is the default.) 
  scope.setFingerprint(['my-view-function']); // 自定义group
  scope.setExtra("character_name", "Mighty Fighter");
);

```





## 实战

### 关联Source Map

#### CLI手动关联

https://docs.sentry.io/cli/releases/#creating-releases

```bash
sentry-cli --url http://127.0.0.1:9000 login
sentry-cli releases -o appest -p react new staging@0.0.1
sentry-cli releases -o appest -p react files staging@0.0.1 upload-sourcemaps --url-prefix '~/static/js' '/Users/curly/Workspace/Draft/my-app/build/static/js' --rewrite
sentry-cli releases -o appest -p react finalize staging@0.0.1
sentry-cli releases -o appest -p react files staging@0.0.1 delete --all
```

~/.sentryclirc

```
[defaults]
url=http://127.0.0.1:9000
org=appest
project=react

[auth]
token=5da1dbd1fbff46a984cac1f4050f6c07fe711d130bbb42ce9921697bb0309533
```

#### webpack

```js
const SentryCliPlugin = require("@sentry/webpack-plugin");

plugins: [
  new SentryCliPlugin({
    release: "staging@0.0.2",
    include: "build/static/js",
    urlPrefix: "~/static/js",
    ignoreFile: ".sentrycliignore",
    ignore: ["node_modules"],
    configFile: "~/.sentryclirc"
  })
]
```

### 分组策略

```js
class DatabaseConnectionError extends Error {}

Sentry.init({
  ...,
  beforeSend: (event, hint) => {
    const exception = hint.originalException;

    if (exception instanceof DatabaseConnectionError) {
      event.fingerprint = ['database-connection-error'];
    }

    return event;
  }
});
```

### 自定义数据

```js
Sentry.configureScope((scope) => {
  scope.setUser(
	{
		id: "",
		username: "",
		email: "john.doe@example.com",
		ip_address: ""
	}
	scope.setTag("page_locale", "de-at");
  scope.setLevel('warning'); //‘fatal’, ‘error’, ‘warning’, ‘info’, and ‘debug’. (‘error’ is the default.) 
  scope.setExtra("character_name", "Mighty Fighter");
);
```

