
import Fastify from "fastify";
import fastifyAuth from '@fastify/auth';
import cors from '@fastify/cors';
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import mongoose from "mongoose";

import { RegisterRoutes } from "./routes/registration.js";

dotenv.config()

const fastify = Fastify({
  logger: true
});

if(process.env.dev_env) {
  fastify.register(cors, { 
    origin: ["https://aabp-dev.netlify.app", "https://aabp-prod.netlify.app", "https://aventuriersdebadenpowell.org", "https://aventuriersdebadenpowell.org/", /localhost/]
  })
}
else {
  fastify.register(cors , { 
    origin: ["https://aabp-dev.netlify.app", "https://aabp-prod.netlify.app", "https://aventuriersdebadenpowell.org/", "https://aventuriersdebadenpowell.org"]
  })
}

fastify.decorate('onRequest', function (request, reply, done) {
    try {    
      jwt.verify(request.headers.authorization).identity
    } catch (error) {
      reply.code(401)
    }

    done()
  })
.register(fastifyAuth)

fastify.register(RegisterRoutes)

mongoose.connect(process.env.mlab, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err))

const start = async () => {
  let port = process.env.PORT || process.env.port;
  let host = process.env.HOST || '::';
  await fastify.listen( { port, host }, function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  })
}
start()
