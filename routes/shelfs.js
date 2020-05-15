const express = require('express')
const router = express.Router()
const Shelf = require('../models/shelf.js')

//Getting all
router.get('/',async (req, res)=> {
    try{
        const shelfs = await Shelf.find()
        res.json(shelfs)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

//Getting One
router.get('/:id', getShelf, (req, res)=> {
   res.send(res.shelf)

})

//Search by name
router.get('/search/name', async (req, res) => {
    try {
        var param = req.body.search != null ? req.body.search : ""

        const books = await Shelf.find({ name: { $regex: '.*' + param + '.*' } }, 'name')
        res.json(books)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//Creating One
router.post('/', async (req, res)=> {
    const shelf = new Shelf({
        name: req.body.name,
        books: req.body.books
    })
    try{
        const newShelf = await shelf.save()
        res.status(201).json(newShelf)
    } catch(err){
        res.status(400).json({message: err.message})
    }
})

//Update One
router.patch('/:id',getShelf, async (req, res)=> {
    if(req.body.name != null){
        res.shelf.name = req.body.name
    }
    if(req.body.books != null){
        res.shelf.books = req.body.books
    }

    try{
        const updatedShelf = await res.shelf.save()
        res.json(updatedShelf)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

//Delete One
 router.delete('/:id', getShelf, async (req, res)=> {
    try{
        await res.shelf.remove()
        res.json({message: 'Deleted shelf'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

//Private
async function getShelf(req, res, next){
    try{
        const shelf = await Shelf.findById(req.params.id)
        if(shelf == null){
            return res.status(404).json({message: 'Cannot find shelf',code: '41'})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
    shelf.count = 5
    res.shelf = shelf
    next()
}

module.exports = router