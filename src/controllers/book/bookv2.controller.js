const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const Book = require('../../models/book.model.js')
const functions = require("../../utils/functions.js");

//Fixed values
const pageLimit = process.env.BOOK_LIMIT;
const options = {
    select: 'title author images',
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

        const books = await Book.paginate({user: req.user}, options)
        res.json(books)
    } catch(err){
        res.status(500).json({message: err.message})
    }
};

exports.addBook = async (req, res)=> {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        genres: req.body.genres,
        isbn: req.body.isbn,
        owned: req.body.owned,
        read: req.body.read,
        pages: req.body.pages,
        olkey: req.body.olkey,
        olcover: req.body.olcover,
        ebook: req.body.ebook,
        user: req.user,
        images: req.body.images
    })
    try{
        const newBook = await book.save();
        var  response =  await Book.findById(newBook.id)
                             .populate('author genres');

        res.status(201).json(response)
    } catch(err){
        res.status(400).json({message: err.message})
    }
};

exports.searchBookByTitle = async (req, res) => {
    try {
        var param = functions.GetSearchParam(req.body.search);
        options.page = functions.GetPage(req.body.page);

        const books = await Book.paginate({ title: { $regex: '.*' + param + '.*', '$options' : 'i' }, user: req.user }
                                            ,options)
        res.json(books)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
};

exports.searchBookByIsbn = async (req, res) => {
    try {
        var book = await Book.find({isbn: req.body.isbn, user: req.user})
        res.json(book)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
};

exports.searchBookFilter = async (req, res) => {
    try {
        var search = functions.GetSearchParam(req.body.search);
        var read = functions.GetSearchParam(req.body.read);
        options.page = functions.GetPage(req.body.page);

        var filter = { user: req.user};

        if(search){
            filter = { ...filter, title: { $regex: '.*' + search + '.*', '$options' : 'i' }};
        }

        if(functions.IsBoolean(read)){
            filter = { ...filter, read: read};
        }

        const books = await Book.paginate(filter, options);
        res.json(books)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.getBook = async (req, res, next)=> {
    try{
        var book = await Book.findById(req.params.id)
                                .populate('author genres');
        if(book == null){
            return res.status(httpStatus.NOT_FOUND).json({message: 'Book not found'})
        }

        if(!book.user || book.user.equals(req.user._id) == false){
            return res.status(httpStatus.FORBIDDEN).json({message: 'Forbidden'})
        }

        res.book = book;
        next();
    }catch(err){
        res.status(500).json({message: err.message})
    }
};