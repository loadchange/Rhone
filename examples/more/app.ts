import rhone, { RhoneError } from '../../src'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import qs from 'qs'

// document.cookie = 'a=b'
//
// rhone.get('/more/get').then(res => {
//   console.log(res)
// })
//
// rhone.post('http://127.0.0.1:8088/more/server2', {}, {
//   withCredentials: true
// }).then(res => {
//   console.log(res)
// })
//
// const instance = rhone.create({
//   xsrfCookieName: 'XSRF-TOKEN-D',
//   xsrfHeaderName: 'X-XSRF-TOKEN-D'
// })
//
// instance.get('/more/get').then(res => {
//   console.log(res)
// })

// =======  progress
// const instance = rhone.create()
//
// function calculatePercentage(loaded: number, total: number) {
//   return Math.floor(loaded * 1.0) / total
// }
//
// function loadProgressBar() {
//   const setupStartProgress = () => {
//     instance.interceptors.request.use(config => {
//       NProgress.start()
//       return config
//     })
//   }
//
//   const setupUpdateProgress = () => {
//     const update = (e: ProgressEvent) => {
//       console.log(e)
//       NProgress.set(calculatePercentage(e.loaded, e.total))
//     }
//     instance.defaults.onDownloadProgress = update
//     instance.defaults.onUploadProgress = update
//   }
//
//   const setupStopProgress = () => {
//     instance.interceptors.response.use(response => {
//       NProgress.done()
//       return response
//     }, error => {
//       NProgress.done()
//       return Promise.reject(error)
//     })
//   }
//
//   setupStartProgress()
//   setupUpdateProgress()
//   setupStopProgress()
// }
//
// loadProgressBar()
//
// const downloadEl = document.getElementById('download')
//
// downloadEl!.addEventListener('click', e => {
//   instance.get('/more/googlelogo_color_272x92dp.png')
// })
//
// const uploadEl = document.getElementById('upload')
//
// uploadEl!.addEventListener('click', e => {
//   const data = new FormData()
//   const fileEl = document.getElementById('file') as HTMLInputElement
//   if (fileEl.files) {
//     data.append('file', fileEl.files[0])
//     instance.post('/more/upload', data)
//   }
// })

// auth

// rhone.post('/more/post', { a: 1 }, {
//   auth: {
//     username: 'Yee1',
//     password: '123456'
//   }
// }).then(res => {
//   console.log(res)
// })

// validateStatus
// rhone.get('/more/304').then(res => {
//   console.log(res)
// }).catch((e: RhoneError) => {
//   console.log(e.message)
// })
//
// rhone.get('/more/304', {
//   validateStatus(status) {
//     return status >= 200 && status < 400
//   }
// }).then(res => {
//   console.log(res)
// }).catch((e: RhoneError) => {
//   console.log(e.message)
// })

//
//
// rhone.get('/more/get', {
//   params: new URLSearchParams('a=b&c=d')
// }).then(res => {
//   console.log(res)
// })
//
// rhone.get('/more/get', {
//   params: {
//     a: 1,
//     b: 2,
//     c: ['a', 'b', 'c']
//   }
// }).then(res => {
//   console.log(res)
// })
//
// const instance = rhone.create({
//   paramsSerializer(params) {
//     return qs.stringify(params, {
//       arrayFormat: 'brackets'
//     })
//   }
// })
//
// instance.get('/more/get', {
//   params: {
//     a: 1,
//     b: 2,
//     c: ['a', 'b', 'c']
//   }
// }).then(res => {
//   console.log(res)
// })

//  baseURL

// const instance = rhone.create({
//   baseURL: 'http://127.0.0.1:8080'
// })
//
// instance.get('/more/get')
// instance.get('http://127.0.0.1:8080/more/get')


// all

function getA() {
  return rhone.get('/more/A')
}

function getB() {
  return rhone.get('/more/B')
}

rhone.all([getA(), getB()])
  .then(
    rhone.spread(
      function(resA, resB) {
        console.log(resA.data)
        console.log(resB.data)
      }
    )
  )

rhone.all([getA(), getB()]).then(([resA, resB]) => {
  console.log(resA.data)
  console.log(resB.data)
})

const fakeConfig = {
  baseURL: 'https://www.github.com/',
  url: '/users/LoadChange',
  params: {
    id: 100,
    username: 'Asa'
  }
}
console.log(rhone.getUri(fakeConfig))
