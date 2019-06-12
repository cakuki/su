#! /usr/bin/env node

const {
    PORT = 3000,
    PUBLIC_URL = 'http://localhost:3000',
    MONGO_CS = 'mongodb://localhost/su_development'
} = process.env

const app = require('../src/app')({ PORT, PUBLIC_URL, MONGO_CS })

app.listen(PORT)
