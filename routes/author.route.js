const express = require('express');
const auth = require('../middlewares/auth');
const controller = require("../controllers/author/author.controller");
const controllerv2 = require("../controllers/author/authorv2.controller");

const router = express.Router();

router.route('/')
    .get(controller.getAuthors)
    .post(controller.addAuthor)

router.route('/v2')
    .get(auth(), controllerv2.getAuthors)
    .post(auth(), controllerv2.addAuthor);

router.route('/search/name')
    .get(auth(), controllerv2.searchAuthorByName);

router.route('/:id')
    .get(controller.getAuthor, controller.getAuthorDetail)
    .patch(controller.getAuthor, controller.updateAuthor)
    .delete(controller.getAuthor,controller.deleteAuthor);

router.route('/v2/:id')
    .get(auth(), controllerv2.getAuthor, controller.getAuthorDetail)
    .patch(auth(), controllerv2.getAuthor, controller.updateAuthor)
    .delete(auth(), controllerv2.getAuthor, controller.deleteAuthor);

module.exports = router;