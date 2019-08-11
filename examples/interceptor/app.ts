import rhone from '../../src'

rhone.interceptors.request.use(config => {
  config.headers.test += '1'
  return config
})

rhone.interceptors.request.use(config => {
  config.headers.test += '2'
  return config
})

rhone.interceptors.request.use(config => {
  config.headers.test += '3'
  return config
})

rhone.interceptors.response.use(res => {
  res.data += '1'
  return res
})

const interceptor = rhone.interceptors.response.use(res => {
  res.data += '2'
  return res
})

rhone.interceptors.response.use(res => {
  res.data += '3'
  return res
})

rhone.interceptors.response.eject(interceptor)

rhone({
  url: '/interceptor/get',
  method: 'get',
  headers: {
    test: ''
  }
}).then(res => {
  console.log(res.data)
})

