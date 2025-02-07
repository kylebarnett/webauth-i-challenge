const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../users/userModel');

router.post('/register', (req, res) => {
  console.log(req.body)
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  Users.add(user)
    .then(saved => {
      req.session.user = saved;
      res.status(201).json(saved);
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: error });
    });
})

router.post('/login', (req, res) => {
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.json({ message: 'You can checkout but you can\'t leave' })
      } else {
        res.json({message: 'You\'ve been logged out.'}).end()
      }
    })
  }
})

module.exports = router