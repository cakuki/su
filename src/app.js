const Fastify = require('fastify')
const mongoose = require('mongoose')

const buildServer = (config) => {
  const fastify = Fastify()

  fastify.register((instance, opts, next) => {
    mongoose.connect(config.MONGO_CS, { useNewUrlParser: true }, next)
  })

  require('./redirection')(config)

  fastify.route({
    method: 'POST',
    url: '/',
    schema: {
      body: {
        type: 'object',
        required: ['url'],
        properties: {
          url: { type: 'string' }
        }
      }
    },
    handler: async (request, reply) => {
      const redirection = new mongoose.model('Redirection')({ original: request.body.url })

      await redirection.save()

      reply.send(redirection.toJSON({ virtuals: true }))
    }
  })

  fastify.get('/:hash', async (request, reply) => {
    const redirection = await mongoose.model('Redirection').findOne({ hash: request.params.hash })

    if (!redirection) return reply.status(404).send('Not found')

    reply.redirect(redirection.original)
  })

  return fastify
}

module.exports = buildServer
