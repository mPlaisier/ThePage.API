const express = require('express')
const router = express.Router()
const Genre = require('../models/genre.js')

//Fixed values
const pageLimit = 25
const options = {
    limit: pageLimit,
    sort: { name: 'asc'},
    collation: { locale: 'en' }
};

//Getting all
router.get('/',async (req, res)=> {
    try{
        var pageNumber = req.body.page > 0 ? req.body.page : 1
        options.page = pageNumber;

        const genres = await Genre.paginate({}, options)
        res.json(genres)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

//Getting One
router.get('/:id', getGenre, (req, res)=> {
   res.send(res.genre)
})

//Search by name
router.get('/search/name', async (req, res) => {
    try {
        var param = req.body.search != null ? req.body.search : ""
        
        var pageNumber = req.body.page > 0 ? req.body.page : 1
        options.page = pageNumber;

        const genres = await Genre.paginate({ name: { $regex: '.*' + param + '.*', '$options' : 'i' } }
                                                ,options)
        res.json(genres)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//Creating One
router.post('/', async (req, res)=> {
    const genre = new Genre({
        name: req.body.name
    })
    try{
        const newGenre = await genre.save()
        res.status(201).json(newGenre)
    } catch(err){
        res.status(400).json({message: err.message})
    }
})

//Update One
router.patch('/:id',getGenre, async (req, res)=> {
    if(req.body.name != null){
        res.genre.name = req.body.name
    }

    try{
        const updateGenre = await res.genre.save()
        res.json(updateGenre)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

//Delete One
 router.delete('/:id', getGenre, async (req, res)=> {
    try{
        await res.genre.remove()
        res.json({message: 'Deleted Genre'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

// Private
async function getGenre(req, res, next){
    try{
        const genre = await Genre.findById(req.params.id)
        if(genre == null){
            return res.status(404).json({message: 'Cannot find genre',code: '31'})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }

    res.genre = genre
    next()
}

module.exports = router