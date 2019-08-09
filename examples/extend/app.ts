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


rhone({
  method: 'get',
  url: '/extend/get',
  params: {
    id: 200
  }
})

rhone('/extend/post', {
  method: 'post',
  data: {
    id: 201
  }
})


rhone('/extend/get')

interface ResponseData<T = any> {
  code: number
  result: T
  message: string
}

interface User {
  name: string
  age: number
}

function getUser<T>() {
  return rhone<ResponseData<T>>('/extend/user').then(res => res.data).catch(err => console.log((err)))
}

async function test() {
  const user = await getUser<User>()
  if (user) {
    console.log(user.result.name)
  }
}

test()
