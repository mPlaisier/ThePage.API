const express = require('express')
const router = express.Router()
const Book = require('../models/book.js')

//Fixed values
const pageLimit = 25

//Getting all
router.get('/',async (req, res)=> {
    try{
        var pageNumber = req.body.page > 0 ? req.body.page : 1
        const options = {
            select: 'title author',
            sort: { title: 'asc'},
            page: pageNumber,
            populate: {
                path: 'author',
                select: 'name'
            },
            limit: pageLimit,
            collation: { locale: 'en' }
        };

        const books = await Book.paginate({}, options)
        res.json(books)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

//Getting One
router.get('/:id', getBook, (req, res)=> {
   res.send(res.book)

})

//Search by Title
router.get('/search/title', async (req, res) => {
    try {
        var param = req.body.search != null ? req.body.search : ""

        const books = await Book.find({ title: { $regex: '.*' + param + '.*', '$options' : 'i' } }, 'title author')
                                .populate('author', 'name')
        res.json(books)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//Creating One
router.post('/', async (req, res)=> {
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
})

//Update One
router.patch('/:id',getBook, async (req, res)=> {
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
        res.json(updatedBook)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

//Delete One
 router.delete('/:id', getBook, async (req, res)=> {
    try{
        await res.book.remove()
        res.json({message: 'Deleted book'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

//Private
async function getBook(req, res, next){
    try{
        const book = await Book.findById(req.params.id)
        if(book == null){
            return res.status(404).json({message: 'Cannot find book',code: '21'})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }

    res.book = book
    next()
}

module.exports = router