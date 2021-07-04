const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');

const Cart = mongoose.model('Cart');
const Upload = mongoose.model('Upload');

//Add To Cart
router.put('/add/:cartID', async (req, res) => {
  console.log('Updating Cart...');
  try {
    const product = await Upload.findById(req.query.productID);

    const cart = await Cart.update(
      {_id: req.params.cartID},
      {
        $push: {products: product},
      },
    );

    let result = await cart.save();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
});

//Get Cart Items From Database
router.get('/get/:cartID', async (req, res) => {
  try {
    console.log('Getting Cart Items...');

    const cart = await Cart.find({
      _id: req.params.cartID,
    })
      .skip(parseInt(req.query.numOfLoadedProducts))
      .limit(10)
      .select({
        products: {
          _id: 1,
          userID: 1,
          name: 1,
          images: {$slice: 1},
          price: 1,
          description: 1,
          timestamp: 1,
          school: 1,
          phoneNumber: 1,
          likes: 1,
        },
      });

    res.send(cart);
  } catch (err) {
    console.log(err);
  }
});

//Get Images From Database
router.get('/get_images', async (req, res) => {
  try {
    console.log('Getting Images...');

    const images = await Cart.findById(req.query.cartID).select({
      products: {
        images: 1,
      },
    });
    res.send(images);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
