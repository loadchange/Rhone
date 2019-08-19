import rhone from '../../src'
import qs from 'qs'

rhone.defaults.headers.common['test2'] = 123

rhone({
  method: 'post',
  url: '/config/post',
  data: qs.stringify({
    a: 1
  }),
  headers: {
    test: '321'
  }
}).then(res => {
  console.log(res.data)
})
