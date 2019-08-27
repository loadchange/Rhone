import rhone, { Canceler } from '../../src'

const CancelToken = rhone.CancelToken
const source = CancelToken.source()


rhone.get('/cancel/get', {
  cancelToken: source.token
}).catch(e => {
  if (rhone.isCancel(e)) {
    console.log('[ERROR] Request canceled', e.message)
  }
})
setTimeout(() => {
  source.cancel('Operation canceled by the user.')
  setTimeout(() => {
    rhone.post('/cancel/post', { a: 1 }, {
      cancelToken: source.token
    }).catch(e => {
      if (rhone.isCancel(e)) {
        console.log('[ERROR] POST', e.message)
      }
    })
  })
}, 100)

let cancel: Canceler

rhone.get('/cancel/get', {
  cancelToken: new CancelToken(c => {
    cancel = c
  })
}).catch(e => {
  if (rhone.isCancel(e)) {
    console.log('[ERROR] Request canceled', e.message)
  }
})

setTimeout(() => {
  cancel()
}, 200)
