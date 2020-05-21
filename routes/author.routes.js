const controller = require("../controllers/author/author.controller");
const controllerv2 = require("../controllers/author/authorv2.controller");

module.exports = function(app) {
    app.get("/api/authors/", controller.getAuthors);

    app.get("/api/authors/v2", controllerv2.getAuthors); 

    app.get("/api/authors/:id", controller.getAuthor, controller.getAuthorDetail);

    app.get("/api/authors/search/name", controllerv2.searchAuthorByName);

    app.post("/api/authors", controller.addAuthor);

    app.patch("/api/authors/:id", controller.getAuthor, controller.updateAuthor);

    app.delete("/api/authors/:id", controller.getAuthor,controller.deleteAuthor);
};