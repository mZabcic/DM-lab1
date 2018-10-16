'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
require('make-promises-safe') 
const oauthPlugin = require('fastify-oauth2')

module.exports = function (fastify, opts, next) {
  // Place here your custom code!

  // Do not touch the following lines

  fastify.use(require('cors')());


  fastify.register(require('fastify-mongodb'), {
    // force to close the mongodb connection when app stopped
    // the default value is false
    forceClose: true,
    useNewUrlParser: true,
    url: 'mongodb://localhost/dm'
  })




fastify.register(oauthPlugin, {
  name: 'facebookOAuth2',
  credentials: {
    client: {
      id: '188013922150830',
      secret: 'ecd10a44a78c999405a2f08e15eb346c'
    },
    auth: oauthPlugin.FACEBOOK_CONFIGURATION
  },
  startRedirectPath: '/login/facebook',
  callbackUri: 'http://localhost:3000/login/facebook/callback'
})

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in services
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'services'),
    options: Object.assign({}, opts)
  })

  

  // Make sure to call next when done
  next()
}
