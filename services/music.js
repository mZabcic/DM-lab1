const sget = require('simple-get')



module.exports = async function (fastify, opts) {

    //ce4660562a136f3c4727b6b680597b5e


  fastify.get(
    "/albums/:name",
    {
        beforeHandler: [fastify.authenticate]
    },
    async function(request, reply) {
        var artistName = request.params.name;
        var user = request.user.id;
        sget.concat({
            url: 'http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=' + artistName + '&api_key=ce4660562a136f3c4727b6b680597b5e&format=json&limit=10',
            method: 'GET',
            headers: {
            },
            json: true
          }, function (err, res, data) {
            if (err) {
              reply.send(err)
              return
            }
           
           reply.send(data);
    
            
          })
       

    }
  )
}