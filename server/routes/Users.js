const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 255,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
    school: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
    },
    gender: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 6,
    },
  }),
);

const Cart = mongoose.model(
  'Cart',
  new mongoose.Schema({
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    products: {
      type: Array,
      required: true,
    },
  }),
);

function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().max(50).required().label('First Name'),
    lastName: Joi.string().max(50).required().label('Last Name'),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email({minDomainSegments: 2})
      .label('Email Address'),
    password: Joi.string()
      .alphanum()
      .min(5)
      .max(255)
      .required()
      .label('Password'),
    confirmPassword: Joi.ref('password'),
    school: Joi.string().required().label('School'),
    gender: Joi.string().required().label('Gender'),
  });
  return schema.validate(user);
}

router.post('/', async (req, res) => {
  try {
    const {error} = validateUser(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    } else {
      //Check if user already exists
      let user = await User.findOne({email: req.body.email});

      if (user) {
        return res.status(400).send(`User Already Registered`);
      } else {
        //Generating Hashed Password
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);

        //Creating User
        user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: password,
          school: req.body.school,
          gender: req.body.gender,
        });
        //Saving user to database
        const result = await user.save();

        console.log(result._id);

        //Creating User Cart
        const cart = new Cart({
          _id: result._id,
          products: [],
        });
        //Saving user cart to database
        await cart.save();

        const authToken = jwt.sign(
          {
            _id: result._id,
            firstName: user.firstName,
            lastName: user.lastName,
            school: user.school,
          },
          'jwtPrivateKey',
        );
        res.header('x-auth-token', authToken).send(result);
      }
    }
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
