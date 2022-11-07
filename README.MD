# Request

## Introduce

基于Promise的网络请求库，包含请求配置、拦截器等功能。

## Installation

```
npm install @yujin321/request
```

## Start

```javascript
import request from "request"

request({
    method: "get",
    url: '/api/json'
}).then((res)=> {
    console.log(res);
}).catch(err=> {
    console.error(err);
})
```

## Development

develop

```bash
npm run dev
```

debugger

```bash
npm run examples
```

build

```bash
npm run build
```

