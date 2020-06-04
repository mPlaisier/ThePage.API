const express = require('express');
const auth = require('../middlewares/auth');
const controller = require("../controllers/shelf/shelf.controller");
const controllerv2 = require("../controllers/shelf/shelfv2.controller");

const router = express.Router();

router.route('/')
    .get(controller.getShelfs)
    .post(controller.addShelf);

router.route('/v2/')
    .get(auth(), controllerv2.getShelfs)
    .post(auth(), controllerv2.addShelf);

router.route('/search/name/')
    .get(auth(), controllerv2.searchShelfByName);

router.route('/:id')
    .get(controller.getShelf, controller.getShelfDetail)
    .patch(controller.getShelf, controller.updateShelf)
    .delete(controller.getShelf,controller.deleteShelf);

router.route('/v2/:id')    
    .get(auth(), controllerv2.getShelf, controller.getShelfDetail)
    .patch(auth(), controllerv2.getShelf, controller.updateShelf)
    .delete(auth(), controllerv2.getShelf, controller.deleteShelf);

module.exports = router;