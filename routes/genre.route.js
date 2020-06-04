const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const controller = require("../controllers/genre/genre.controller");
const genreValidation = require('../validations/genre.validation');
const controllerv2 = require("../controllers/genre/genrev2.controller");

const router = express.Router();

router.route('/')
    .get(controller.getGenres)
    .post(controller.addGenre);

router.route('/v2/')
    .get(auth(), validate(genreValidation.getGenres), controllerv2.getGenres)
    .post(auth(), validate(genreValidation.addGenre), controllerv2.addGenre);

router.route('/search/name/')
    .get(auth(), validate(genreValidation.searchGenreByName), controllerv2.searchGenreByName);

router.route('/:id')
    .get(controller.getGenre, controller.getGenreDetail)
    .patch(controller.getGenre, controller.updateGenre)
    .delete(controller.getGenre, controller.deleteGenre);

router.route('/v2/:id')    
    .get(auth(), controllerv2.getGenre, validate(genreValidation.getGenreDetail), controller.getGenreDetail)
    .patch(auth(), controllerv2.getGenre, validate(genreValidation.updateGenre), controller.updateGenre)
    .delete(auth(), controllerv2.getGenre, validate(genreValidation.deleteGenre), controller.deleteGenre);
    
module.exports = router;