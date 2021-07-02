exports.getGenreDetail = (req, res)=> {
    res.send(res.genre)
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