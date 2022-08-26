require('dotenv').config()

const jwt = require('jsonwebtoken');
const fastify = require('fastify')({
  logger: true
})

const mongoose = require('mongoose')
const routes = require('./routes')
const PublicRoutes = require('./routes/PublicRoutes')

if(process.env.dev_env) {
  fastify.register(require('fastify-cors'), { 
    origin: ["https://aabp-dev.netlify.app", "https://aabp-prod.netlify.app", "https://aventuriersdebadenpowell.org", "https://aventuriersdebadenpowell.org/", /localhost/]
  })
}
else {
  fastify.register(require('fastify-cors'), { 
    origin: ["https://aabp-dev.netlify.app", "https://aabp-prod.netlify.app", "https://aventuriersdebadenpowell.org/", "https://aventuriersdebadenpowell.org"]
  })
}

const validateAsync = async (token) => {
  jwt.verify(token, process.env.signingsecret).identity
}

fastify
  .decorate('verifyJwt', async function (request, reply, done) {
    try {    
      await validateAsync(request.headers.authorization) 
    } catch (error) {
      reply.code(401)
    }  

    done() // pass an error if the authentication fails
  })
.register(require('@fastify/auth'))
.after(() => {
  PublicRoutes.forEach((route, index) => {
    fastify.route(route)
  })
  
  routes.forEach((route, index) => {
    fastify.route({...route, 
      preHandler: fastify.auth([
        fastify.verifyJwt
      ])
    })
  })
})

mongoose.connect(process.env.mlab, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err))

const start = async () => {
  let port = (!!process.env.port ? process.env.PORT : process.env.port);
  let host = 'localhost';
  await fastify.listen( { port, host }, function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  })
}
start()
