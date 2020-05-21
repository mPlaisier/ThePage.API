const express = require('express');
const controller = require("../controllers/genre/genre.controller");
const controllerv2 = require("../controllers/genre/genrev2.controller");

const router = express.Router();

router.route('/')
    .get(controller.getGenres)
    .post(controller.addGenre);

router.route('/v2/')
    .get(controllerv2.getGenres);

router.route('/:id')
    .get(controller.getGenre, controller.getGenreDetail)
    .patch(controller.getGenre, controller.updateGenre)
    .delete(controller.getGenre,controller.deleteGenre);

router.route('/search/name/')
    .get(controllerv2.searchGenreByName);

module.exports = router;