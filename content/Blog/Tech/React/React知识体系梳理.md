# React知识体系梳理

## JSX

### 是什么？

JSX是JavaScript的语法扩展，用来描述用户界面

### 使用规范

1. JSX语句本身也是表达式，在JS代码中可以作为普通表达式使用
2. JSX语句中引号包裹字符串，大括号包裹JS表达式
3. JSX语言特性沿袭JS特性，因此属性名使用驼峰式规范
4. JSX默认进行防注入攻击，渲染前会过滤所有传入值，并且将所有内容都转为字符串

### 扩展

#### 模块

由于 JSX 编译后会调用 `React.createElement` 方法，所以在包含JSX的模块中必须先引入`React` 模块

#### 标签名

1. 内置组件标签名以小写字母开头，如`<div><span>`。自定义组件标签名以大写字母开头

2. 标签名可以使用点表示法` <MyComponents.DatePicker color="blue" />`

3. 标签名不能为表达式

   ```react
   function Story(props) {
     // 错误！JSX 标签名不能为一个表达式。
     return <components[props.storyType] story={props.story} />;
   }
   
   function Story(props) {
     // 正确！JSX 标签名可以为大写开头的变量。
     const SpecificStory = components[props.storyType];
     return <SpecificStory story={props.story} />;
   }
   ```

#### 属性

1. 如果你没有给属性传值，它默认为 `true`

2. 如果已经有一个props对象，可以使用扩展运算符传递整个属性对象

#### 子代

1. 子代可以是字符串常量，JSX，JS表达式，函数

2. 布尔值、Null 和 Undefined 被忽略

### 本质

Babel转译器会将JSX转译为React.createElement方法，该方法首先会进行一些避免bug的检查，之后返回React元素（一个JavaScript对象）。JSX 只是为 `React.createElement(component, props, ...children)` 方法提供的语法糖。



## React元素渲染

### 渲染过程

React DOM 使 React 元素 和 浏览器 DOM 的数据内容保持一致

通过`ReactDOM.render()` 将React元素渲染到页面上

### 更新元素

React元素是一个不可变的（immutable），元素被创建之后无法改变其内容和属性

若要更新，创建一个新的React元素，重新调用`ReactDOM.render()`渲染 

React DOM 首先会比较元素内容先后的不同，而在渲染过程中只会更新改变了的部分



## 组件

### 是什么？

独立的、可复用的部件

接收任意的输入值（称之为“props”），并返回一个React元素。

### 定义方法

函数定义

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

类定义

```javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

### Props

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

ReactDOM.render(
  <Welcome name="Sara" />,
  document.getElementById('root')
);
```

调用自定义组件，组件上的属性集合到props对象上传递给组件

所有的React组件必须像纯函数（输入值不会被改变，输入值相同总会输出相同的结果）那样使用它们的props。

**PropTypes**

类型检查

`PropTypes` 包含一整套验证器，可用于确保你接收的数据是有效的。

当你给属性传递了无效值时，JavsScript 控制台将会打印警告。出于性能原因，`propTypes` 只在开发模式下进行检查。

>  注意: `React.PropTypes` 自 React v15.5 起已弃用。请使用 [`prop-types` ](https://www.npmjs.com/package/prop-types)库代替。

**defaultProps **

属性默认值

类型检查发生在 `defaultProps` 赋值之后，所以类型检查也会应用在 `defaultProps` 上面。



## State & 生命周期

### State

状态，组件内部维护

- 构造函数是唯一能够初始化```this.state```的地方

- `this.props`和`this.state`的更新可能是异步的，React 可以将多个`setState()` 调用合并成一个调用来提高性能。

  ```javascript
  // Wrong
  this.setState({
    counter: this.state.counter + this.props.increment,
  });
  
  // Correct
  this.setState((prevState, props) => ({
    counter: prevState.counter + props.increment
  }));
  ```

- `setState()`是一个请求

  ```react
  // 不依赖state计算时书写
  // callback在setState执行完成同时组件被重渲之后执行，等同于componentDidUpdate的作用
  this.setState({
      counter: 2
  }, [callback]);
  
  // 依赖state之前的状态
  this.setState((prevState) => {
    return {counter: prevState.quantity + 1};
  });
  ```

- 单向数据流，通过state维护组件内部状态，通过props向子组件传递数据

### 生命周期

- `defaultProps`, `propTypes`
- `constructor()` - 构造函数是初始化状态的合适位置。
- `UNSAFE_componentWillMount()` - 装配发生前调用，在这方法里同步地设置状态将不会触发重渲
- `render()` - 渲染时调用
- `componentDidMount()` - 组件装配完成时调用，初始化DOM节点，发送网络请求，事件订阅
- `UNSAFE_componentWillReceiveProps(nextProps)` - 装配了的组件接收到新属性前调用，即使属性未有任何改变，也可能会调用该方法，请确保比较前后值
- `shouldComponentUpdate(nextProps, nextState)` - 当接收到新属性或状态时在渲染前调用，该方法并不会在初始化渲染或当使用`forceUpdate()`时被调用
- `UNSAFE_componentWillUpdate()` - 接收到新属性或状态时时调用，不能在这调用`this.setState()`
- `getDerivedStateFromProps(nextProps, prevState)` - 组件实例化后和接受新属性时调用，调用`this.setState()` 通常不会触发，返回响应属性
- `getSnapshotBeforeUpdate(prevProps, prevState)` - 在最新的渲染输出提交给DOM前将会立即调用，这一生命周期返回的任何值将会 作为参数被传递给`componentDidUpdate()`
- `componentDidUpdate(prevProps, prevState)` - 更新发生后立即调用，不会在初始化渲染时调用。操作DOM，发送请求
- `componentWillUnmount()` - 组件被卸载和销毁之前立刻调用。清理定时器、请求、DOM节点、事件订阅



## 事件处理

### this

类的方法默认不会绑定`this`，解决办法：

- 在构造函数中使用bind绑定

- 使用实验性的属性初始化器

  ```react
  class LoggingButton extends React.Component {
    // This syntax ensures `this` is bound within handleClick.
    // Warning: this is *experimental* syntax.
    handleClick = () => {
      console.log('this is:', this);
    }
  
    render() {
      return (
        <button onClick={this.handleClick}>
          Click me
        </button>
      );
    }
  }
  ```

- 使用箭头函数定义回调函数

  ```react
  class LoggingButton extends React.Component {
    handleClick() {
      console.log('this is:', this);
    }
  
    render() {
      // This syntax ensures `this` is bound within handleClick
      return (
        <button onClick={(e) => this.handleClick(e)}>
          Click me
        </button>
      );
    }
  }
  ```

  每次渲染时会创建一个不同的回调函数，如果回调函数作为一个属性值传入低阶组件，会导致额外渲染

### event

React封装的一个合成事件[SyntheticEvent](https://react.docschina.org/docs/events.html)

事件处理函数返回`false`不会再阻止事件传播, 所以必须得手动触发`e.stopPropagation()`和`e.preventDefault()` 方法。

```json
boolean bubbles
boolean cancelable
DOMEventTarget currentTarget
boolean defaultPrevented
number eventPhase
boolean isTrusted
DOMEvent nativeEvent
void preventDefault()
boolean isDefaultPrevented()
void stopPropagation()
boolean isPropagationStopped()
DOMEventTarget target
number timeStamp
string type
```



### 传递参数

```react
class Popper extends React.Component{
    constructor(){
        super();
        this.state = {name:'Hello world!'};
    }
    
    preventPop(name, e){    //事件对象e要放在最后
        e.preventDefault();
        alert(name);
    }
    
    render(){
        return (
            <div>
                <p>hello</p>
                {/* Pass params via bind() method. */}
                <a onClick={this.preventPop.bind(this, this.state.name)}>Click</a>
                <a onClick={(e) => {this.preventPop(this.state.name, e)}}>Click</a>
            </div>
        );
    }
}
```



## 条件渲染

在render函数中使用条件语句实现条件渲染，可以使用变量来储存元素

在JSX中使用条件运算符组成表达式实现条件渲染

让 `render` 方法返回 `null`隐藏组件



## 列表

通过使用`{}`在JSX内构建一个元素集合

**key**

每个列表元素需要有`key`属性

`keys`可以在DOM中的某些元素被增加或删除的时候帮助`React`识别哪些元素发生了变化

`key`会作为给`React`的提示，但不会传递给你的组件

```react
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}
```



## 表单

### 受控组件

通过onChange+setState控制状态改变，使React控制组件状态

```react
<input type="text" value={this.state.value} onChange={this.handleChange} />
```

```react
<textarea value={this.state.value} onChange={this.handleChange} />
```

```react
<select value={this.state.value} onChange={this.handleChange}>
    <option value="grapefruit">Grapefruit</option>
    <option value="lime">Lime</option>
    <option value="coconut">Coconut</option>
    <option value="mango">Mango</option>
</select>
```

当你有处理多个受控的`input`元素时，你可以通过给每个元素添加一个`name`属性，来让处理函数根据 `event.target.name`的值来选择做什么。

### 非受控组件

通过ref获取获取DOM

在 React 的生命周期中，表单元素上的 `value` 属性将会覆盖 DOM 中的值

使用defaultValue指定初始值



## 状态提升

使用 react 经常会遇到几个组件需要共用状态数据的情况。

这种情况下，我们最好将这部分共享的状态提升至他们最近的父组件当中进行管理。



## 组合 vs 继承

通过子代`props.children`或者自定义属性承载组件

使用组合实现包含关系，动态定义传入容器的子组件

使用组合实现特殊实例，替换继承的作用，比如说Prom



## React理念

- 组件按单一功能封装
- 设定最小可变状态集，要点是 DRY：*不要重复(Don’t Repeat Yourself)*。找出应用程序的绝对最小表示并计算你所需要的其他任何请求。例如，如果你正在创建一个 TODO 列表，只要保存一个包含 TODO 事项的数组；不要为计数保留一个单独的状态变量。相反，当你想要渲染 TODO 计数时，只需要使用 TODO 数组的长度就可以了。



## Refs & DOM

React v16.3

1. 创建ref `React.createRef()`
2. 关联ref，可以使用直接关联也可使用回调

```react
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // 创建 ref 存储 textInput DOM 元素
    this.textInput = React.createRef();
    this.buttonInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
    this.setTextInputRef = element => {
      this.buttonInput = element;
    };
  }

  focusTextInput() {
    // 直接使用原生 API 使 text 输入框获得焦点
    // 注意：通过 "current" 取得 DOM 节点
    this.textInput.current.focus();
  }

  render() {
    // 告诉 React 我们想把 <input> ref 关联到构造器里创建的 `textInput` 上
    return (
      <div>
        <input
          type="text"
          ref={this.textInput} />

          
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
          ref={this.setTextInputRef}
        />
      </div>
    );
  }
}
```

`ref` 的更新会发生在`componentDidMount` 或 `componentDidUpdate` 生命周期钩子之前。



## 性能优化

### 使用生产版本

开发模式下React会更大更慢，因此一定要用生产版本部署

### 使用 Chrome Performance 归档组件

1. 在项目地址栏内添加查询字符串 `?react_perf`（例如， `http://localhost:3000/?react_perf`）。
2. 打开Chrome开发工具**Performance** 标签页点击**Record**.
3. 执行你想要分析的动作。不要记录超过20s，不然Chrome可能会挂起。
4. 停止记录。
5. React事件将会被归类在 **User Timing**标签下。

### 避免重复渲染

使用SCU控制

### 避免数据突变

支持ES6的情况下，使用Object.assign/扩展运算符返回新数据，防止引用类型数据突变

使用Immutable.js保持数据不可变，降低出错率



## Reconciliation

1. 两个不同类型的元素将产生不同的树。
2. 通过渲染器附带`key`属性，开发者可以示意哪些子元素可能是稳定的。



## Context

共享那些被认为对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言。

不要仅仅为了避免在几个层级下的组件传递 props 而使用 context，它是被用于在多个层级的多个组件需要访问相同数据的情景。

```react
const {Provider, Consumer} = React.createContext(defaultValue);

<Provider value={/* some value */}>

<Consumer>
  {value => /* render something based on the context value */}
</Consumer>
```

每当Provider的值发送改变时, 作为Provider后代的所有Consumers都会重新渲染。 从Provider到其后代的Consumers传播不受shouldComponentUpdate方法的约束，因此即使祖先组件退出更新时，后代Consumer也会被更新。



## Fragments

聚合一个子元素列表，代替组件根元素使用

`<></>` 是 `<React.Fragment/>` 的语法糖。

`<></>` 语法不能接受键值或属性，要添加key属性需要使用`<React.Fragment/>`



## Portals

Portals 提供了一种将子节点渲染到父组件以外的 DOM 节点的方式。

```react
ReactDOM.createPortal(child, container)
// child 可渲染的React子元素
// container DOM元素
```

虽然DOM树中的位置平行，但React树中组件仍在根组件树中，树组件仍能捕获到事件



## 错误边界

### 是什么？

错误边界组件**用于捕获其子组件树 JavaScript 异常，记录错误并展示一个回退的 UI** 。

错误边界在渲染期间，生命周期方法内，以及整个组件树构造函数内捕获错误。

错误边界无法捕获事件处理函数内部的错误，事件处理函数内部的错误使用try...catch捕获。

错误边界无法捕获异步事件的错误，异步事件的错误在回调函数内部自行处理。

错误边界无法捕获服务器端渲染和错误边界自身抛出的错误。

**自 React 16 开始，任何未被错误边界捕获的错误将会卸载整个 React 组件树。**

### 组件内部

如果一个类组件定义了 `componentDidCatch(error, info):` 方法，则该组件是一个错误边界组件。

```react
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // error: 错误信息
    // info: 组件栈追踪
    this.setState({ hasError: true });
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

### 组件使用

错误边界的粒度完全取决于你的应用。你可以将其包装在最顶层的路由组件并为用户展示一个 “发生异常（Something went wrong）“的错误信息，就像服务端框架通常处理崩溃一样。你也可以将单独的插件包装在错误边界内部以保护应用不受该组件崩溃的影响。



## Web Components

Web Components是W3C规范的新功能，提供自定义元素封装功能。相当于在DOM的层面封装一个自定义元素，元素的展示和特性在Web Components内部实现。在React眼中，一个Web Component和一个普通元素无异。

React组件是React层面的元素单元，封装有UI、逻辑、数据响应。



## 高阶组件（HOC）

### 是什么？

对组件逻辑进行重用的一种抽象模式

**高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件**

```react
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

通过将原组件 *包裹* 在容器组件里面的方式来 *组合* 使用原组件。高阶组件就是一个没有副作用的纯函数。

### 需避免的问题

- 请使用组合性高阶组件，避免使用更改性高阶组件

  在高阶组件内部修改（或以其它方式修改）原组件的原型属性，称为更改性高阶组件

  ```react
  function logProps(InputComponent) {
    InputComponent.prototype.componentWillReceiveProps(nextProps) {
      console.log('Current props: ', this.props);
      console.log('Next props: ', nextProps);
    }
    // 我们返回的原始组件实际上已经
    // 被修改了。
    return InputComponent;
  }
  
  // EnhancedComponent会记录下所有的props属性
  const EnhancedComponent = logProps(InputComponent);
  ```

  在高阶组件内部使用组合返回一个新的组件，称为组合型高阶组件

  ```react
  function logProps(WrappedComponent) {
    return class extends React.Component {
      componentWillReceiveProps(nextProps) {
        console.log('Current props: ', this.props);
        console.log('Next props: ', nextProps);
      }
      render() {
        // 用容器组件组合包裹组件且不修改包裹组件，这才是正确的打开方式。
        return <WrappedComponent {...this.props} />;
      }
    }
  }
  ```

- 高阶组件应该传递与它要实现的功能点无关的props属性

  ```react
  render() {
    // 过滤掉与高阶函数功能相关的props属性，
    // 不再传递
    const { extraProp, ...passThroughProps } = this.props;
  
    // 向包裹组件注入props属性，一般都是高阶组件的state状态
    // 或实例方法
    const injectedProp = someStateOrInstanceMethod;
  
    // 向包裹组件传递props属性
    return (
      <WrappedComponent
        injectedProp={injectedProp}
        {...passThroughProps}
      />
    );
  }
  ```

- 最大化使用组合

  ```react
  const ConnectedComment = connect(commentSelector, commentActions)(Comment);
  ```

  connect函数返回一个高阶组件

  使用compose代替高阶组件嵌套使用

  ```react
  const enhance = compose(
    // 这些都是单参数的高阶组件
    withRouter,
    connect(commentSelector)
  )
  const EnhancedComponent = enhance(WrappedComponent)
  ```

- 不要在render()中调用高阶函数

- 将静态方法做拷贝，当使用高阶组件包装组件，原始组件被容器组件包裹，也就意味着新组件会丢失原始组件的所有静态方法。使用hoistNonReactStatic处理

- 高阶组件返回组件命名

  ```react
  function withSubscription(WrappedComponent) {
    class WithSubscription extends React.Component {/* ... */}
    WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
    return WithSubscription;
  }
  
  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }
  ```

- refs不会被传递到被包裹组件，React16.3版本中加入React.forwardRef解决这个问题

  ```react
  function logProps(Component) {
    class LogProps extends React.Component {
      componentDidUpdate(prevProps) {
        console.log('old props:', prevProps);
        console.log('new props:', this.props);
      }
  
      render() {
        const {forwardedRef, ...rest} = this.props;
  
        // Assign the custom prop "forwardedRef" as a ref
        return <Component ref={forwardedRef} {...rest} />;
      }
    }
  
    // Note the second param "ref" provided by React.forwardRef.
    // We can pass it along to LogProps as a regular prop, e.g. "forwardedRef"
    // And it can then be attached to the Component.
    function forwardRef(props, ref) {
      return <LogProps {...props} forwardedRef={ref} />;
    }
  
    // These next lines are not necessary,
    // But they do give the component a better display name in DevTools,
    // e.g. "ForwardRef(logProps(MyComponent))"
    const name = Component.displayName || Component.name;
    forwardRef.displayName = `logProps(${name})`;
  
    return React.forwardRef(forwardRef);
  }
  ```



## Render Props

```react
<DataProvider render={data => (
  <h1>Hello {data.target}</h1>
)}/>
```

### 是什么？

一个函数属性，用于渲染

属性名不一定是render，重要的是它起到的作用

### 注意

- 在使用时最好指定propType
- props检查优化，直接使用函数在render时会返回新函数；可以将函数定义为实例方法使用，从而避免这一问题



## 与第三方库协同

与jQuery协同，把DOM操作交给jQuery，React数据驱动渲染与jQuery DOM分离



## 可访问性

- JSX支持所有的`aria-*` HTML属性
- JSX中`for`特性被写作`htmlFor`



## 代码分割

`import()`动态导入 + `react-loadable`模块

```react
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

const Loading = () => <div>Loading...</div>;

const Home = Loadable({
  loader: () => import('./routes/Home'),
  loading: Loading,
});

const About = Loadable({
  loader: () => import('./routes/About'),
  loading: Loading,
});

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
    </Switch>
  </Router>
);
```



## API

### createElement()

```react
React.createElement(
  type,
  [props],
  [...children]
)
```

### cloneElement()

```react
React.cloneElement(
  element,
  [props],
  [...children]
)
```

以 `element` 作为起点，克隆并返回一个新的React元素(React Element)。生成的元素将会拥有原始元素props与新props的浅合并。新的子级会替换现有的子级。来自原始元素的 `key` 和 `ref`将会保留。

### isValidElement()

验证对象是否是一个React元素。返回 `true` 或 `false` 。

### React.Children

`React.Children` 提供了处理 `this.props.children` 这个数据结构的工具。

```react
React.Children.map(children, function[(thisArg)])
React.Children.forEach(children, function[(thisArg)])
React.Children.count(children)
React.Children.only(children)
React.Children.toArray(children)
```



## ReactDOM

`import ReactDOM from 'react-dom'`

```react
ReactDOM.render(
  element,
  container,
  [callback]
)
```

```react
ReactDOM.findDOMNode(component)
```

