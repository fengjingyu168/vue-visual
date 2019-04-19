const environment = require('../ENV')

const local = {
  ENV: 'local',
  API: '',
  publicPath: './'
}

const development = {
  ENV: 'development',
  API: '',
  publicPath: './'
}

const testing = {
  ENV: 'testing',
  API: '',
  publicPath: './'
}

const sit = {
  ENV: 'sit',
  API: '',
  publicPath: './'
}

const APP_Test = {
  ENV: 'APP',
  API: '',
  publicPath: './'
}

const APP_Prod = {
  ENV: 'APP',
  API: '',
  publicPath: './'
}

module.exports = (function () {
  if (environment === 'development') {
    return development
  }else if (environment === 'local') {
    return local
  } else if (environment === 'testing') {
    return testing
  } else if (environment === 'sit') {
    return sit
  } else if (environment === 'APP_Test') {
    return APP_Test
  } else if (environment === 'APP_Prod') {
    return APP_Prod
  }
})()
