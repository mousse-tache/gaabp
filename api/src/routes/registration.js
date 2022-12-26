import routes, { PublicRoutes } from "./index.js";

function RegisterRoutes(fastify, options, done) {
    PublicRoutes.forEach((route, index) => {
        fastify.route(route)
      })
      
    routes.forEach((route, index) => {
        fastify.route({...route, 
            preHandler: fastify.auth([
            fastify.onRequest
            ])
        })
    })

    done()
}

export { RegisterRoutes }
