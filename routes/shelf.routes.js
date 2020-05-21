const controller = require("../controllers/shelf/shelf.controller");
const controllerv2 = require("../controllers/shelf/shelfv2.controller");

module.exports = function(app) {
    app.get("/api/shelfs/", controller.getShelfs);

    app.get("/api/shelfs/v2", controllerv2.getShelfs);

    app.get("/api/shelfs/:id", controller.getShelf, controller.getShelfDetail);

    app.get("/api/shelfs/search/name", controllerv2.searchShelfByName);

    app.post("/api/shelfs", controller.addShelf);

    app.patch("/api/shelfs/:id", controller.getShelf, controller.updateShelf);

    app.delete("/api/shelfs/:id", controller.getShelf,controller.deleteShelf);
};