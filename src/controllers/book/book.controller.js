const mongoose = require('mongoose')
const Book = require('../../models/book.model.js')
const Shelf = require('../../models/shelf.model.js')

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
        const books = await Book.find()
        res.json(books)
    } catch(err){
        res.status(500).json({message: err.message})
    }
}

exports.getBookDetail = (req, res)=> {
    res.send(res.book) 
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
        ebook: req.body.ebook
    })
    try{
        const newBook = await book.save()
        res.status(201).json(newBook)
    } catch(err){
        res.status(400).json({message: err.message})
    }
}

exports.updateBook =  async (req, res)=> {
    if(req.body.title != null){
        res.book.title = req.body.title
    }
    if(req.body.author != null){
        res.book.author = req.body.author
    }

    if(req.body.genres != null){
        res.book.genres = req.body.genres
    }

    if(req.body.isbn != null){
        res.book.isbn = req.body.isbn
    }

    if(req.body.owned != null){
        res.book.owned = req.body.owned
    }

    if(req.body.read != null){
        res.book.read = req.body.read
    }

    if(req.body.pages != null){
        res.book.pages = req.body.pages
    }

    if(req.body.olkey != null){
        res.book.olkey = req.body.olkey
    }

    if(req.body.olcover != null){
        res.book.olcover = req.body.olcover
    }

    if(req.body.ebook != null){
        res.book.ebook = req.body.ebook
    }

    try{
        const updatedBook = await res.book.save()
        if(updatedBook != null){
            var book = await Book.findById(req.params.id)
                                .populate('author genres');
            res.json(book)
        }else{
            res.json(updatedBook)
        }
    }catch(err){
        res.status(400).json({message: err.message})
    }
};

exports.deleteBook = async (req, res)=> {
    try{
        var id = mongoose.Types.ObjectId(res.book.id);
        await res.book.remove();

        await Shelf.updateMany(
            {},
            { $pull: { books: id} });

        res.json({message: 'Deleted book'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
};

exports.getBook = async (req, res, next)=> {
    try{
        var book = await Book.findById(req.params.id)
        if(book == null){
            return res.status(404).json({message: 'Cannot find book',code: '31'})
        }        
    }catch(err){
        res.status(500).json({message: err.message})
    }
    res.book = book;
    next();
};