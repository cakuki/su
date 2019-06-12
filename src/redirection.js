const crypto = require('crypto')
const mongoose = require('mongoose')

const random = () => crypto.randomBytes(3).toString('hex')

module.exports = (config) => {
  const Redirection = new mongoose.Schema({
    hash: { type: String, required: true, unique: true, default: random },
    original: { type: String, required: true }
  }, { id: false })

  Redirection.virtual('location')
    .get(function() {
      return `${config.PUBLIC_URL}/${this.hash}`
    })

  return mongoose.model('Redirection', Redirection)
}
