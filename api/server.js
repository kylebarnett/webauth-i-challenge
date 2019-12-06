const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const connectSessionKnex = require('connect-session-knex');

const userRouter = require('./users/userRouter');
const authRouter = require('./auth/authRouter');
const db = require('../data/database/dbConfig.js');

const server = express();

const KnexSessionStore = connectSessionKnex(session)

const sessionConfig = {
  name: 'cookie name',
  // Never hard code the secret
  secret: 'the mandalorian is good',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false,
  store: new KnexSessionStore({
    knex: db,
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use('/api/users', userRouter)
server.use('/api/auth', authRouter)

module.exports = server;