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

//Creating One
router.post('/', async (req, res)=> {
    const author = new Author({
        name: req.body.name
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
        res.json({message: 'Deleted book'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

// Private
async function getAuthor(req, res, next){
    try{
        author = await Author.findById(req.params.id)
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