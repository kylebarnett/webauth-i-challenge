const db = require('../../data/database/dbConfig');

module.exports = {
  find,
  findBy,
  add
}

function find() {
  return db('users').select('id', 'username', 'password')
}

function findBy(filter) {
  return db('users')
    .select('id', 'username', 'password')
    .where(filter)
}

function add(info) {
  return db('users').insert(info)
}