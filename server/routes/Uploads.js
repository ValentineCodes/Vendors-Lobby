const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const Upload = mongoose.model(
  'Upload',
  new mongoose.Schema({
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {type: String, required: true},
    images: {
      type: Array,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    timestamp: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
  }),
);

function validateUpload(upload) {
  const schema = Joi.object({
    userID: Joi.string().label('User ID'),
    name: Joi.string().required().label('Product Name'),
    category: Joi.string().required().label('Category'),
    images: Joi.array().required().label('Images'),
    price: Joi.number().required().label('Price'),
    description: Joi.string().label('Description'),
    school: Joi.string().required().label('School'),
    phoneNumber: Joi.number().required().label('Phone Number'),
  });
  return schema.validate(upload);
}

// Storing Images To Products Folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './products/');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname),
    );
  },
});

const upload = multer({
  storage: storage,
});

//Post Uploads To Database
router.post('/add', upload.array('images', 10), async (req, res) => {
  console.log('Posting Data...');

  try {
    const images = [];
    req.files.map((image) => {
      images.push({
        url: 'http://9cdabd8a09bb.ngrok.io/' + image.path,
      });
    });

    let upload = new Upload({
      userID: req.body.userID,
      name: req.body.productName,
      category: req.body.category,
      images: images,
      price: req.body.price,
      description: req.body.description,
      timestamp: '10-3-2921',
      school: req.body.school,
      phoneNumber: req.body.phoneNumber,
      likes: 0,
    });

    //Saving Upload To Database

    await upload.save();
  } catch (err) {
    console.log(err);
  }
});

//Get Uploads From Database
router.get('/:category', async (req, res) => {
  try {
    console.log('Getting Products...');

    const uploads = await Upload.find({
      category: req.params.category.replace(/_/g, ' '),
    })
      .skip(parseInt(req.query.numOfLoadedProducts))
      .limit(10)
      .select({
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
      });
    res.send(uploads);
  } catch (err) {
    console.log(err);
  }
});
//Get Filtered Uploads
router.get('/filter', async (req, res) => {
  try {
    console.log('Getting Products...');

    const uploads = await Upload.find({
      category: req.query.category.replace(/_/g, ' '),
      school: req.query.school.replace(/_/g, ' '),
    })
      .skip(parseInt(req.query.numOfLoadedProducts))
      .limit(10)
      .select({
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
      });
    res.send(uploads);
  } catch (err) {
    console.log(err);
  }
});

//Get Images From Database
router.get('/get_images', async (req, res) => {
  try {
    console.log('Getting Images...');

    const images = await Upload.findById(req.query.productID).select({
      images: 1,
    });
    res.send(images);
  } catch (err) {
    console.log(err);
  }
});

//Add A Like To Products
router.post('/like_product', async (req, res) => {
  console.log('Adding Like To Product...');
  try {
    const product = await Upload.update(
      {_id: req.params.productID},
      {
        $inc: {likes: 1},
      },
    );
    await product.save();
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
