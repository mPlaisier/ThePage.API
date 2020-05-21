const controller = require("../controllers/shelf/shelf.controller");
const controllerv2 = require("../controllers/shelf/shelfv2.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/shelfs/", controller.getShelfs);

    app.get("/api/shelfs/v2", controllerv2.getShelfs);

    app.get("/api/shelfs/:id", controller.getShelf, controller.getShelfDetail);

    app.get("/api/shelfs/search/name", controllerv2.searchShelfByName);

    app.post("/api/shelfs", controller.addShelf);

    app.patch("/api/shelfs/:id", controller.getShelf, controller.updateShelf);

    app.delete("/api/shelfs/:id", controller.getShelf,controller.deleteShelf);
};