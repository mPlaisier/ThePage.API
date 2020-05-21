const controller = require("../controllers/book/book.controller");
const controllerv2 = require("../controllers/book/bookv2.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/books/", controller.getBooks);

   app.get("/api/books/v2", controllerv2.getBooks); 

    app.get("/api/books/:id", controller.getBook, controller.getBookDetail);

    app.get("/api/books/search/title", controllerv2.searchBookByTitle);

    app.get("/api/books/search/isbn", controllerv2.searchBookByIsbn);

    app.post("/api/books", controller.addBook);

    app.patch("/api/books/:id", controller.getBook, controller.updateBook);

    app.delete("/api/books/:id", controller.getBook,controller.deleteBook);
};