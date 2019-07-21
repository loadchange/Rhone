import rhone from '../../src'

rhone({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  }
})
