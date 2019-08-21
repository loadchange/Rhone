import rhone, { RhoneTransformer } from '../../src'
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
  console.log('res1:', res.data)
})


rhone({
  transformRequest: [
    data => {
      console.log('data', data)
      return qs.stringify(data)
    },
    ...(rhone.defaults.transformRequest as RhoneTransformer[])
  ],
  transformResponse: [
    ...(rhone.defaults.transformResponse as RhoneTransformer[]),
    data => {
      if (typeof data === 'object') {
        data.b = 2
      }
      return data
    }
  ],
  method: 'post',
  url: '/config/post',
  data: qs.stringify({
    a: 1
  })
}).then(res => {
  console.log('res2:', res.data)
})
