const express = require('express');
const controller = require("../controllers/shelf/shelf.controller");
const controllerv2 = require("../controllers/shelf/shelfv2.controller");

const router = express.Router();

router.route('/')
    .get(controller.getShelfs)
    .post(controller.addShelf);

router.route('/v2/')
    .get(controllerv2.getShelfs);

router.route('/:id')
    .get(controller.getShelf, controller.getShelfDetail)
    .patch(controller.getShelf, controller.updateShelf)
    .delete(controller.getShelf,controller.deleteShelf);

router.route('/search/name/')
    .get(controllerv2.searchShelfByName);

module.exports = router;