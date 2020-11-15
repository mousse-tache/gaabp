require('dotenv').config()

const fastify = require('fastify')({
  logger: true
})

const mongoose = require('mongoose')

// Import Routes
const routes = require('./routes')
fastify.register(require('fastify-cors'), { 
  origin: ["https://aabp-dev.netlify.app", "https://aabp-prod.netlify.app", "https://aventuriersdebadenpowell.org", /localhost/]
})

const bearerAuthPlugin = require('fastify-bearer-auth')
const keys = new Set([process.env.api_token])

fastify.register(bearerAuthPlugin, {keys})

mongoose.connect(process.env.mlab, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err))

routes.forEach((route, index) => {
  fastify.route(route)
})

const start = async () => {
  try {
    await fastify.listen(process.env.port, '0.0.0.0')
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
