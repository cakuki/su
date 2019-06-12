const test = require('ava')
const { MongoMemoryServer } = require('mongodb-memory-server')

const mongod = new MongoMemoryServer()
const buildServer = require('../src/app')

test.before(async t => {
  const mongoConnectionUrl = await mongod.getConnectionString()
  const app = buildServer({ PORT: 3000, PUBLIC_URL: 'http://localhost:3000', MONGO_CS: mongoConnectionUrl })

  t.context.app = app
  await app.ready()
})

test.after.always(async t => {
  t.context.app.close()
  mongod.stop()
})


test('create', async t => {
  const res = await t.context.app.inject({
    method: 'POST',
    url: '/',
    payload: { url: 'http://www.example.com' }
  })

  t.is(res.statusCode, 200)
})

test('redirect', async t => {
  const resCreate = await t.context.app.inject({
    method: 'POST',
    url: '/',
    payload: { url: 'http://www.example.com' }
  })

  const { hash, original } = JSON.parse(resCreate.body)

  const resRedirect = await t.context.app.inject({
    method: 'GET',
    url: `/${hash}`
  })

  t.is(resRedirect.statusCode, 302)
  t.is(resRedirect.headers.location, original)
})
