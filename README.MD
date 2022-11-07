# Fetcher

## Introduce

基于fetcher实现的网络请求库，包含请求配置、拦截器等功能。

## Examples

```
npm run examples
```

## Start
```javascript
import Fetcher from "fetcher"

const fetcher = new Fetcher().send({
    method: "get",
    url: '/api/json'
}).then((res)=> {
    // success
}).catch(err=> {
    // error
})
```