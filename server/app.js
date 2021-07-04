const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use('/products', express.static('products'));
app.use(express.json());

// Imported Routes;
const users = require('./routes/Users');
const uploads = require('./routes/Uploads');
const carts = require('./routes/Carts');

//Routes
app.use('/users', users);
app.use('/uploads', uploads);
app.use('/carts', carts);

mongoose
  .connect('mongodb://localhost/Project', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(`MongoDB Connection Failed: ${err}`));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server Running...'));
