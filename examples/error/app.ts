import rhone, { RhoneError } from '../../src'

rhone({
  method: 'get',
  url: '/error/get1'
}).then(res => console.log(res)).catch((e: RhoneError) => {
  console.log(e.message)
  console.log(e.code)
  console.log(e.config)
  console.log(e.request)
})

rhone({
  method: 'get',
  url: '/error/get'
}).then(res => console.log(11, res)).catch(e => console.error(11, e))

setTimeout(() => rhone({
  method: 'get',
  url: '/error/get'
}).then(res => console.log(16, res)).catch(e => console.error(16, e)), 5000)

rhone({
  method: 'get',
  url: '/error/timout',
  timeout: 2000
}).then(res => console.log(22, res)).catch(e => console.error(22, e))
