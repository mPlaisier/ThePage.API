const controller = require("../controllers/genre/genre.controller");
const controllerv2 = require("../controllers/genre/genrev2.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/genres/", controller.getGenres);

    app.get("/api/genres/v2", controllerv2.getGenres);

    app.get("/api/genres/:id", controller.getGenre, controller.getGenreDetail);

    app.get("/api/genres/search/name", controllerv2.searchGenreByName);

    app.post("/api/genres", controller.addGenre);

    app.patch("/api/genres/:id", controller.getGenre, controller.updateGenre);

    app.delete("/api/genres/:id", controller.getGenre,controller.deleteGenre);
};