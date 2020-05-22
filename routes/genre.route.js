const express = require('express');
const auth = require('../middlewares/auth');
const controller = require("../controllers/genre/genre.controller");
const controllerv2 = require("../controllers/genre/genrev2.controller");

const router = express.Router();

router.route('/')
    .get(controller.getGenres)
    .post(controller.addGenre);

router.route('/v2/')
    .get(auth(), controllerv2.getGenres)
    .post(auth(), controllerv2.addGenre);

router.route('/search/name/')
    .get(auth(), controllerv2.searchGenreByName);

router.route('/:id')
    .get(controller.getGenre, controller.getGenreDetail)
    .patch(controller.getGenre, controller.updateGenre)
    .delete(controller.getGenre, controller.deleteGenre);

router.route('/v2/:id')    
    .get(auth(), controllerv2.getGenre, controller.getGenreDetail)
    .patch(auth(), controllerv2.getGenre, controller.updateGenre)
    .delete(auth(), controllerv2.getGenre, controller.deleteGenre);
module.exports = router;