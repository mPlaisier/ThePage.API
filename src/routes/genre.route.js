const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const genreValidation = require('../validations/genre.validation');
const controller = require("../controllers/genre/genre.controller");
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
    .get(auth(), validate(genreValidation.getGenreDetail), controllerv2.getGenre, controller.getGenreDetail)
    .patch(auth(), validate(genreValidation.updateGenre), controllerv2.getGenre, controller.updateGenre)
    .delete(auth(), validate(genreValidation.deleteGenre), controllerv2.getGenre, controller.deleteGenre);
    
module.exports = router;