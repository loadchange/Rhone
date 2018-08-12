# Sirius

> Sirius is the brightest star in the sky after the sun


## HTTP CODE
- 200 成功
- 204 执行成功无返回
- 401 未授权
- 405 方法不被允许
- 409 冲突, 意味着请求不能被处理因为存在冲突，例如多个更新的情况下存在修改冲突。
- 412 先决条件失败
- 501 方法未实现

## mongo
* `mkdir -p ~/mongo  ~/mongo/db`
* `docker run -p 27017:27017 -v ~/mongo/db:/data/db -d mongo:3.4.21`