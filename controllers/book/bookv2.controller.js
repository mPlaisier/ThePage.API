const Book = require('../../models/book.model.js')
const functions = require("../../utils/functions.js");

//Fixed values
const pageLimit = process.env.BOOK_LIMIT;
const options = {
    select: 'title author',
    sort: { title: 'asc'},
    populate: {
        path: 'author',
        select: 'name'
    },
    limit: pageLimit,
    collation: { locale: 'en' }
};

exports.getBooks = async (req, res)=> {
    try{
        options.page = functions.GetPage(req.body.page);

        const books = await Book.paginate({}, options)
        res.json(books)
    } catch(err){
        res.status(500).json({message: err.message})
    }
};

exports.searchBookByTitle = async (req, res) => {
    try {
        var param = functions.GetSearchParam(req.body.search);
        options.page = functions.GetPage(req.body.page);

        const books = await Book.paginate({ title: { $regex: '.*' + param + '.*', '$options' : 'i' } }
                                            ,options)
        res.json(books)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
};

exports.searchBookByIsbn = async (req, res) => {
    try {
        var book = await Book.find({isbn: req.body.isbn})
        res.json(book)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
};