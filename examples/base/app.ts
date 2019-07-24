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
