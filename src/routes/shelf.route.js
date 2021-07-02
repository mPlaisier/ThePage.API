const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const shelfValidation = require('../validations/shelf.validation');
const controller = require("../controllers/shelf/shelf.controller");
const controllerv2 = require("../controllers/shelf/shelfv2.controller");

const router = express.Router();

router.route('/v2/')
    .get(auth(), validate(shelfValidation.getShelfs), controllerv2.getShelfs)
    .post(auth(), validate(shelfValidation.addShelf), controllerv2.addShelf);

router.route('/search/name/')
    .get(auth(), validate(shelfValidation.searchShelfByName), controllerv2.searchShelfByName);

router.route('/v2/:id')    
    .get(auth(), validate(shelfValidation.getShelfDetail), controllerv2.getShelf, controller.getShelfDetail)
    .patch(auth(), validate(shelfValidation.updateShelf), controllerv2.getShelf, controller.updateShelf)
    .delete(auth(), validate(shelfValidation.deleteShelf), controllerv2.getShelf, controller.deleteShelf);

module.exports = router;