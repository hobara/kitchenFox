import express, { Router } from 'express';
import { userIndex } from './controllers/users';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from './models/user';

const router = Router();
const secret = '7x0jhxt&quot;9(thpX6';
// delete unless needed

router.get('/protected', (req, res, next) => {
  passport.authenticate('jwt', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    if (user) {
      return res
        .status(200)
        .json({ secret: '123' });
    }
  })(req, res, next);
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ err });
    }
    if (user) {
      const token = jwt.sign({ id: user._id, email: user.email }, secret)
      return res
        .status(200)
        .json({ token });
    }
  })(req, res, next);
});

// User postman to submit request, only works for urlencoded type data
router.post('/register', (req, res) => {
  User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
    if (err) {
      return res.status(400).send({error: "Email address in use"});
    }
    res.status(200).send({user:user.id});
  });
});

// router.route('/users.json').get(userIndex);

router.route('/').get((req, res) =>
  res.send('Hello Errbody!')
);

export default router;
