'use strict'



export default async function models (server) {
  const User = require('./models/user');  
  server.register(User)
}