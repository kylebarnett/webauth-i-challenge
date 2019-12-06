const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('./userModel');

router.get('/', restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

function restricted(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: 'Invalid Credentials' });
  }
}

module.exports = router;