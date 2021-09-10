const mongoose = require('mongoose')
const Book = require('../../models/book.model.js')
const Shelf = require('../../models/shelf.model.js')

exports.getBookDetail = (req, res)=> {
    res.send(res.book) 
 };

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