const sget = require('simple-get')



module.exports = async function (fastify, opts) {

fastify.get(
    "/games/name/:name",
    {
      beforeHandler: [fastify.authenticate]
    },
    async function(request, reply) {
        var gameName = request.params.name;
        sget.concat({
            url: 'https://api-endpoint.igdb.com/games/?search='+ gameName +'&fields=*&order=popularity:desc&limit=10',
            method: 'GET',
            headers: {
                "user-key": '16ded679b18076173ec9913fa39f6802'
            },
            json: true
          }, function (err, res, data) {
            if (err) {
              reply.send(err)
              return
            }
           
           reply.send(data);
    
            
          })

      });

      fastify.get(
        "/genre/:id",
        {
          beforeHandler: [fastify.authenticate]
        },
        async function(request, reply) {
            var id = request.params.id;
            sget.concat({
                url: 'https://api-endpoint.igdb.com/genres/' + id,
                method: 'GET',
                headers: {
                    "user-key": '16ded679b18076173ec9913fa39f6802'
                },
                json: true
              }, function (err, res, data) {
                if (err) {
                  reply.send(err)
                  return
                }
               
               reply.send(data);
        
                
              })
    
          });

          fastify.get(
            "/genre",
            {
              beforeHandler: [fastify.authenticate]
            },
            async function(request, reply) {
                sget.concat({
                    url: 'https://api-endpoint.igdb.com/genres/?limit=50&fields=name',
                    method: 'GET',
                    headers: {
                        "user-key": '16ded679b18076173ec9913fa39f6802'
                    },
                    json: true
                  }, function (err, res, data) {
                    if (err) {
                      reply.send(err)
                      return
                    }
                   
                   reply.send(data);
            
                    
                  })
        
              });


      fastify.get(
        "/games/:id",
        {
          beforeHandler: [fastify.authenticate]
        },
        async function(request, reply) {
            var gameId = request.params.id;
            sget.concat({
                url: 'https://api-endpoint.igdb.com/games/' + gameId + '?fields=*&order=popularity:desc&limit=10',
                method: 'GET',
                headers: {
                    "user-key": '16ded679b18076173ec9913fa39f6802'
                },
                json: true
              }, function (err, res, data) {
                if (err) {
                  reply.send(err)
                  return
                }
               
               reply.send(data);
        
                
              })
    
          });
      
}
  


  
