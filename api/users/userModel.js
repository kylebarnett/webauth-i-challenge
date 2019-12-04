const db = require('../../data/database/dbConfig');

module.exports = {
  find
}

function find() {
  return db('users').select('id', 'username', 'password')
}