const express = require('express')
const router = express.Router()
const Book = require('../models/book.js')

//Getting all
router.get('/',async (req, res)=> {
    try{
        const books = await Book.find()
        res.json(books)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

//Getting One
router.get('/:id', getBook, (req, res)=> {
   res.send(res.book)

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
        pages: req.body.pages
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
        book = await Book.findById(req.params.id)
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