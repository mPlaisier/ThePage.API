const express = require('express');
const auth = require('../middlewares/auth');
const controller = require("../controllers/book/book.controller");
const controllerv2 = require("../controllers/book/bookv2.controller");

const router = express.Router();

router.route('/')
    .get(controller.getBooks)
    .post(controller.addBook);

router.route('/v2/')
    .get(auth(), controllerv2.getBooks)
    .post(auth(), controllerv2.addBook);

router.route('/search/title')
    .get(auth(), controllerv2.searchBookByTitle);

router.route('/search/isbn')
    .get(auth(), controllerv2.searchBookByIsbn);

router.route('/:id')
    .get(controller.getBook, controller.getBookDetail)
    .patch( controller.getBook, controller.updateBook)
    .delete(controller.getBook,controller.deleteBook);

router.route('/v2/:id')
    .get(auth(), controllerv2.getBook, controller.getBookDetail)
    .patch(auth(), controllerv2.getBook, controller.updateBook)
    .delete(auth(), controllerv2.getBook, controller.deleteBook);
    
module.exports = router;