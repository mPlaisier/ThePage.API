const Shelf = require('../../models/shelf.model.js')

exports.getShelfs = async (req, res)=> {
    try{
        const shelfs = await Shelf.find()
        res.json(shelfs)
    } catch(err){
        res.status(500).json({message: err.message})
    }
}

exports.getShelfDetail = (req, res)=> {
    res.send(res.shelf)
 };

exports.addShelf = async (req, res) => {
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
};

exports.updateShelf = async (req, res)=> {
    if(req.body.name != null){
        res.shelf.name = req.body.name
    }
    if(req.body.books != null){
        res.shelf.books = req.body.books
    }

    try{
        const updateShelf = await res.shelf.save()
        if(updateShelf != null){
            var shelf = await Shelf.findById(req.params.id)
                                .populate({
                                    path: 'books',
                                    select: 'title author',
                                    populate: {
                                        path: 'author',
                                        select: 'name'
                                    }
                                });
            res.json(shelf);
        } else{
            res.json(updateShelf)
        }
    }catch(err){
        res.status(400).json({message: err.message})
    }
};

exports.deleteShelf = async (req, res)=> {
    try{
        await res.shelf.remove()
        res.json({message: 'Deleted Shelf'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
};

exports.getShelf = async (req, res, next)=> {
    try{
        var shelf = await Shelf.findById(req.params.id)
        if(shelf == null){
            return res.status(404).json({message: 'Cannot find shelf',code: '41'})
        }        
    }catch(err){
        res.status(500).json({message: err.message})
    }
    res.shelf = shelf;
    next();
};