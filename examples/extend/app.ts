import rhone from '../../src'

rhone({
  method: 'get',
  url: '/extend/get',
  params: {
    foo: ['bar', 'baz']
  }
})

rhone.request({
  method: 'get',
  url: '/extend/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

rhone.get('/extend/get', {
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

rhone.head('/extend/head')

rhone.options('/extend/options')

rhone.delete('/extend/delete', {
  params: {
    id: 100
  }
})

rhone.post('/extend/post', { a: 1, b: 2 })
rhone.put('/extend/put', { a: 3, b: 4 })
rhone.patch('/extend/patch', { a: 5, b: 6 })
