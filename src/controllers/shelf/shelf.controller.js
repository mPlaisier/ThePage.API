const Shelf = require('../../models/shelf.model.js')

exports.getShelfDetail = (req, res)=> {
    res.send(res.shelf)
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