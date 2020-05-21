const express = require('express');
const authorRout = require('./author.route');
const bookRoute = require('./book.route');
const genreRoute = require('./genre.route');
const shelfRoute = require('./shelf.route');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');

const router = express.Router();

router.use('/authors', authorRout);
router.use('/books', bookRoute);
router.use('/genres', genreRoute);
router.use('/shelfs', shelfRoute);
router.use('/auth', authRoute);
router.use('/user', userRoute);

module.exports = router;