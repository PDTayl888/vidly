
// const jwt = require('jsonwebtoken');
const Joi = require('Joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    console.log(req.body.password);
    console.log(user.password);

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    console.log(validPassword);
    if (!validPassword) return res.status(400).send('Invalid password.');

    const token = user.generateAuthToken();
    res.send(token);
    //res.send(true);
});

function validate(req) {
    const schema = {
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(req, schema);
}
  

module.exports = router;

