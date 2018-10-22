'use strict'
const sget = require('simple-get')

module.exports = async function (fastify, opts) {





fastify.get('/login/facebook/callback', function (request, reply) {
    this.getAccessTokenFromAuthorizationCodeFlow(request, (err, result) => {
      if (err) {
        reply.send(err)
        return
      }
      
      sget.concat({
        url: 'https://graph.facebook.com/v3.1/me?fields=email,first_name,hometown,gender,last_name,age_range,birthday,games,favorite_teams,music',
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
        var User = fastify.mongo.db.model('user');
        var user = new User(data);
        console.log(data.email);
        User.findOne({email : data.email}, function(err, doc) {
          if (err) {
            reply.send(err)
            return
          }
           if (doc == null) {
            user.save(function (err, docs) {
              if (err) {
                console.log(err.stack)
              }
              console.log('New user')
              const token = fastify.jwt.sign(docs.toObject())
              reply.send({ token })
            })
           } else {
            const token = fastify.jwt.sign(doc.toObject())
            reply.send({ token })
           }
        });

        
      })
    })
})
  

fastify.get(
    "/user",
    {
      beforeHandler: [fastify.authenticate]
    },
    async function(request, reply) {
      return request.user
    }
  )


  fastify.get(
    "/user/refresh",
    {
      beforeHandler: [fastify.authenticate]
    },
    async function(request, reply) {
      var User = fastify.mongo.db.model('user');
      sget.concat({
        url: 'https://graph.facebook.com/v3.1/me?fields=name,email,first_name,hometown,gender,last_name,age_range,birthday,games,favorite_teams,music,picture',
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + request.user.authToken
        },
        json: true
      }, function (err, res, data) {
        if (err) {
          reply.send(err)
          return
        }
        
        data.authToken = request.user.authToken;
        data.photoUrl = data.picture.data.url;
        var user = new User(data);
        User.find({id : request.user.id}, function (err, doc) {
          if (err) return handleError(err);
          doc = user; 
          doc.save(function (err, updatedUser) {
            if (err) return handleError(err);
            console.log('User data refreshed')
            reply.send(updatedUser);
          });
        });
       }) 
    }
  )

  fastify.post(
    "/login",
    {},
    async function(request, reply) {
     

      var accesToken = request.body.authToken;
      var userId = request.body.id;
      var picUrl = request.body.photoUrl;
      var User = fastify.mongo.db.model('user');
      User.findOne({id : userId}, function(err, doc) {
        if (err) {
          reply.send(err)
          return
        }
        //console.log(doc);
         if (doc == null) {
          sget.concat({
            url: 'https://graph.facebook.com/v3.1/me?fields=name,email,first_name,hometown,gender,last_name,age_range,birthday,games,favorite_teams,music',
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + accesToken
            },
            json: true
          }, function (err, res, data) {
            if (err) {
              reply.send(err)
              return
            }
            data.authToken = accesToken;
            data.photoUrl =picUrl;
            var user = new User(data);
         
                user.save(function (err, docs) {
                  if (err) {
                    reply.send(err)
                  }
                  console.log('New user')
                  const token = fastify.jwt.sign(docs.toObject())
                  reply.send({ token })
                })
           }) 
         } else {
           doc.authToken = accesToken;
           doc.save(function (err, docs) {
            if (err) {
              reply.send(err)
            }
            console.log('Existing user')
            const token = fastify.jwt.sign(docs.toObject())
            reply.send({ token })
          }) 
         }
      }); 
       

    }
  )

  
}



 