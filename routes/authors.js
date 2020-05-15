const express = require('express')
const router = express.Router()
const Author = require('../models/author.js')

//Getting all
router.get('/',async (req, res)=> {
    try{
        const authors = await Author.find()
        res.json(authors)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

//Getting One
router.get('/:id', getAuthor, (req, res)=> {
   res.send(res.author)
})

//Search by name
router.get('/search/name', async (req, res) => {
    try {
        var param = req.body.search != null ? req.body.search : ""

        const books = await Author.find({ name: { $regex: '.*' + param + '.*' } }, 'name')
        res.json(books)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//Creating One
router.post('/', async (req, res)=> {
    const author = new Author({
        name: req.body.name,
        olkey: req.body.olkey
    })
    try{
        const newAuthor = await author.save()
        res.status(201).json(newAuthor)
    } catch(err){
        res.status(400).json({message: err.message})
    }
})

//Update One
router.patch('/:id',getAuthor, async (req, res)=> {
    if(req.body.name != null){
        res.author.name = req.body.name
    }
    if(req.body.olkey != null){
        res.book.olkey = req.body.olkey
    }

    try{
        const updateAuthor = await res.author.save()
        res.json(updateAuthor)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

//Delete One
 router.delete('/:id', getAuthor, async (req, res)=> {
    try{
        await res.author.remove()
        res.json({message: 'Deleted Author'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

// Private
async function getAuthor(req, res, next){
    try{
        const author = await Author.findById(req.params.id)
        if(author == null){
            return res.status(404).json({message: 'Cannot find author',code: '11'})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }

    res.author = author
    next()
}

module.exports = router