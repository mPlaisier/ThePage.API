const Genre = require('../../models/genre.js')

exports.getGenres = async (req, res)=> {
    try{
        const genres = await Genre.find()
        res.json(genres)
    } catch(err){
        res.status(500).json({message: err.message})
    }
}

exports.getGenreDetail = (req, res)=> {
    res.send(res.genre)
 };

exports.addGenre = async (req, res) => {
    const genre = new Genre({
        name: req.body.name
    })
    try{
        const newGenre = await genre.save()
        res.status(201).json(newGenre)
    } catch(err){
        res.status(400).json({message: err.message})
    }
};

exports.updateGenre = async (req, res)=> {
    if(req.body.name != null){
        res.genre.name = req.body.name
    }

    try{
        const updateGenre = await res.genre.save()
        res.json(updateGenre)
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

exports.deleteGenre = async (req, res)=> {
    try{
        await res.genre.remove()
        res.json({message: 'Deleted Genre'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
};

exports.getGenre = async (req, res, next)=> {
    try{
        var genre = await Genre.findById(req.params.id)
        if(genre == null){
            return res.status(httpStatus.NOT_FOUND).json({message: 'Genre not found'})
        }        
    }catch(err){
        res.status(500).json({message: err.message})
    }
    res.genre = genre;
    next();
};