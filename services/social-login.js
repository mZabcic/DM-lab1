'use strict'
const sget = require('simple-get')



module.exports = async function (fastify, opts) {


/* var userSchema = new Schema({
    first_name : String
,   hometown : {}
,   gender : String
,   last_name : String
,   age_range : { min : Number }
,   birthday : String
,   games : { data: [{name : String, id : ObjectId, created_time : Date}]}
,   favorite_teams : [{ id : ObjectId, name : String}]
,   music : {data : [{name : String, id : ObjectId, created_time : Date}]}
}); */



fastify.get('/login/facebook/callback', function (request, reply) {
    this.getAccessTokenFromAuthorizationCodeFlow(request, (err, result) => {
      if (err) {
        reply.send(err)
        return
      }
      
      sget.concat({
        url: 'https://graph.facebook.com/v3.1/me?fields=first_name,hometown,gender,last_name,age_range,birthday,games,favorite_teams,music',
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + result.access_token
        },
        json: true
      }, function (err, res, data) {
        if (err) {
          reply.send(err)
          return
        }
        reply.send(data)
      })
    })
})
  
}
 