const express = require('express');
const controller = require("../controllers/author/author.controller");
const controllerv2 = require("../controllers/author/authorv2.controller");

const router = express.Router();

router.route('/')
    .get(controller.getAuthors)
    .post(controller.addAuthor)

router.route('/v2')
    .get(controllerv2.getAuthors); 

router.route('/search/name')
    .get(controllerv2.searchAuthorByName);

router.route('/:id')
    .get(controller.getAuthor, controller.getAuthorDetail)
    .patch(controller.getAuthor, controller.updateAuthor)
    .delete(controller.getAuthor,controller.deleteAuthor);

module.exports = router;