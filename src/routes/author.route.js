const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const authorValidation = require('../validations/author.validation');
const controller = require("../controllers/author/author.controller");
const controllerv2 = require("../controllers/author/authorv2.controller");

const router = express.Router();

router.route('/')
    .get(controller.getAuthors)
    .post(controller.addAuthor)

router.route('/v2')
    .get(auth(), validate(authorValidation.getAuthors), controllerv2.getAuthors)
    .post(auth(), validate(authorValidation.addAuthor), controllerv2.addAuthor);

router.route('/search/name')
    .get(auth(), validate(authorValidation.searchAuthorByName), controllerv2.searchAuthorByName);

router.route('/:id')
    .get(controller.getAuthor, controller.getAuthorDetail)
    .patch(controller.getAuthor, controller.updateAuthor)
    .delete(controller.getAuthor,controller.deleteAuthor);

router.route('/v2/:id')
    .get(auth(), validate(authorValidation.getAuthorDetail), controllerv2.getAuthor, controller.getAuthorDetail)
    .patch(auth(), validate(authorValidation.updateAuthor), controllerv2.getAuthor, controller.updateAuthor)
    .delete(auth(), validate(authorValidation.deleteAuthor), controllerv2.getAuthor, controller.deleteAuthor);

module.exports = router;