const sget = require('simple-get')



module.exports = async function (fastify, opts) {

fastify.get(
    "/team",
    {
      beforeHandler: [fastify.authenticate]
    },
    async function(request, reply) {
      var User = fastify.mongo.db.model('user');
      User.findOne({id : request.user.id}, function(err, user) {
        if (err) {
          reply.send(err)
          return
        }
        if (!user) {
          throw new NotFound()
        }
        
       for (var i = 0; i < user.favorite_teams.length; i++) {
            if (user.favorite_teams[i].fdId == null) {
                var ans = sget.concat({
                    url: 'https://api.football-data.org/v1/teams?name=' + encodeURI(user.favorite_teams[i].name),
                    method: 'GET',
                    headers: {
                       'X-Auth-Token' : '393953d32247465491731f5b9ac51eb3'
                    },
                    json: true
                  }, function (err, res, data) {
                    if (err) {
                      reply.send(err)
                      return
                    }
                    console.log(res);
                  
               });
               console.log(ans.res);
               if (ans.teams != undefined && ans.teams.length > 0) {
                    user.favorite_teams[i].fdId = ans.teams[0].id;
               }
            }
        };

        reply.send(user.favorite_teams)





      });
      
    }
  )


  fastify.post(
    "/team",
    {
        beforeHandler: [fastify.authenticate]
    },
    async function(request, reply) {
      var fdId = request.body.fdId;
      var teamId = request.body.teamId;
      var User = fastify.mongo.db.model('user');
      User.findOne({id : request.user.id}, function(err, doc) {
        if (err) {
          reply.send(err)
          return
        }
        
           doc.favorite_teams.forEach(function(el) {
               if (el.id == teamId)
               {
                el.fdId = fdId;
            doc.save(function (err, docs) {
                if (err) {
                  reply.send(err)
                }
                console.log('Team mapped')
                reply.send(docs)
           })
        }
           
          }) 
         
      }); 
       

    }
  )
}