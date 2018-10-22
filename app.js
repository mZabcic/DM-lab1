'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
require('make-promises-safe')
const oauthPlugin = require('fastify-oauth2')

const { Schema } = require('mongoose')


module.exports = function (fastify, opts, next) {
  // Place here your custom code!

  // Do not touch the following lines

  fastify.register(require('fastify-cors'))

  //fastify.register(require('fastify-formbody'));
  

 // fastify.register(require('fastify-multipart'))

  fastify.addContentTypeParser('application/x-www-form-urlencoded', { parseAs: 'string' }, function (req, body, done) {
    try {
      console.log(body);
      var json = JSON.parse(body)
      done(null, json)
    } catch (err) {
      err.statusCode = 400
      done(err, undefined)
    }
  })

  fastify.register(require('fastify-mongoose'), {
    uri: 'mongodb://localhost/dm'
  }, err => {
    if (err) throw err
  }).after(() => {

    var userSchema = new Schema({
      authToken: {
        type: String,
        required: true
      },
      id: {
        type: Number,
        required: true
      },
      photoUrl: {
        type: String,
        required: false
      },
      first_name: {
        type: String,
        required: false
      },
      name: {
        type: String,
        required: true
      }
      , hometown: {
        type: {},
        required: false
      }
      , gender: {
        type: String,
        required: false
      }
      , last_name: {
        type: String,
        required: false
      }
      , age_range: {
        min: {
          type: Number,
          required: false
        }
      }
      , birthday: {
        type: String,
        required: false
      }, email: {
        type: String,
        required: false
      }
      , games: { data: [{ name: String, id: Number, created_time: Date }] }
      , favorite_teams: [{ id: Number, name: String }]
      , music: { data: [{ name: String, id: Number, created_time: Date }] }
    });
    var User = fastify.mongo.db.model('user', userSchema);
  })


  fastify.register(require('fastify-jwt'), {
    secret: 'supersecret'
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
