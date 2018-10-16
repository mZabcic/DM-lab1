'use strict'


module.exports = async function (fastify, opts) {
  
   fastify.get('/', async function (request, reply) {
     return "DM"
   })


   fastify.get('/data', async function (request, reply) {
    return "DM"
  })


 }
