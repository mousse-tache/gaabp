require('dotenv').config()

const jwt = require('jsonwebtoken');
const fastify = require('fastify')({
  logger: true
})

const mongoose = require('mongoose')
const routes = require('./routes')
const IdentityRoutes = require('./routes/identityRoutes')
const User = require('./models/User')

fastify.register(require('fastify-cors'), { 
  origin: ["https://aabp-dev.netlify.app", "https://aabp-prod.netlify.app", "https://aventuriersdebadenpowell.org", /localhost/]
})

const validateAsync = async (token) => {
  var userEmail = jwt.verify(token, process.env.signingsecret).identity
  var user = await User.find({courriel: userEmail})

  console.log(user)
}

fastify
  .decorate('verifyJwt', async function (request, reply, done) {
    await validateAsync(request.headers.authorization)   

    done() // pass an error if the authentication fails
  })
.register(require('fastify-auth'))
.after(() => {
  IdentityRoutes.forEach((route, index) => {
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
  try {
    await fastify.listen(process.env.port == undefined ? process.env.PORT : process.env.port, '0.0.0.0')
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
