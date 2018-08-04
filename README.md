# Sirius

> Sirius is the brightest star in the sky after the sun


## HTTP CODE
- 200 成功
- 204 执行成功无返回
- 401 未授权
- 405 方法不被允许
- 412 先决条件失败
- 501 方法未实现

## mongo
* `mkdir -p ~/mongo  ~/mongo/db`
* `docker run -p 27017:27017 -v ~/mongo/db:/data/db -d mongo:3.4.21`