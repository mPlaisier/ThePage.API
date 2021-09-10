const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const bookValidation = require('../validations/book.validation');
const controller = require("../controllers/book/book.controller");
const controllerv2 = require("../controllers/book/bookv2.controller");

const router = express.Router();

router.route('/v2/')
    .get(auth(), validate(bookValidation.getBooks), controllerv2.getBooks)
    .post(auth(), validate(bookValidation.addBook), controllerv2.addBook);

router.route('/search/title')
    .get(auth(), validate(bookValidation.searchBookByTitle), controllerv2.searchBookByTitle);

router.route('/search/isbn')
    .get(auth(), validate(bookValidation.searchBookByIsbn), controllerv2.searchBookByIsbn); //TODO

router.route('/search/filter')    
    .get(auth(), validate(bookValidation.searchBookFilter), controllerv2.searchBookFilter);

router.route('/v2/:id')
    .get(auth(), validate(bookValidation.getBookDetail), controllerv2.getBook, controller.getBookDetail)
    .patch(auth(), validate(bookValidation.updateBook), controllerv2.getBook, controller.updateBook)
    .delete(auth(), validate(bookValidation.deleteBook), controllerv2.getBook, controller.deleteBook);
    
module.exports = router;