const express = require('express');
const controller = require("../controllers/book/book.controller");
const controllerv2 = require("../controllers/book/bookv2.controller");

const router = express.Router();

router.route('/')
    .get(controller.getBooks)
    .post(controller.addBook);

router.route('/v2/')
    .get(controllerv2.getBooks);

router.route('/:id')
    .get(controller.getBook, controller.getBookDetail)
    .patch( controller.getBook, controller.updateBook)
    .delete(controller.getBook,controller.deleteBook);

router.route('/search/title')
    .get(controllerv2.searchBookByTitle);

router.route('/search/isbn')
    .get(controllerv2.searchBookByIsbn);

module.exports = router;