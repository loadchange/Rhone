import rhone from '../../src'

rhone({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})

rhone({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

const date = new Date()

rhone({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
})

rhone({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
})

rhone({
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'bar',
    baz: null
  }
})

rhone({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'bar'
  }
})

rhone({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    bar: 'baz'
  }
})

rhone({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
})

const arr = new Int32Array([21, 31])

rhone({
  method: 'post',
  url: '/base/buffer',
  data: arr
})

rhone({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
})

rhone({
  method: 'post',
  url: '/base/post',
  headers: {
    'content-type': 'application/json',
    'Accept': 'application/json, text/plain, */*'
  },
  data: {
    a: 1,
    b: 2
  }
})

const paramsString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString)

rhone({
  method: 'post',
  url: '/base/post',
  data: searchParams
})
