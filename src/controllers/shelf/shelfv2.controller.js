const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const Shelf = require('../../models/shelf.model.js')
const functions = require("../../utils/functions.js");

//Fixed values
const pageLimit = process.env.SHELF_LIMIT;
const options = {
    select: 'name books',
    limit: pageLimit,
    sort: { name: 'asc'},
    collation: { locale: 'en' }
};

exports.getShelfs = async (req, res) => {
    try{
        options.page = functions.GetPage(req.body.page);

        const shelfs = await Shelf.paginate({user: req.user}, options);
        res.json(shelfs);
    } catch(err){
        res.status(500).json({message: err.message})
    }
};

exports.addShelf = async (req, res) => {
    const shelf = new Shelf({
        name: req.body.name,
        books: req.body.books,
        user: req.user
    })
    try{
        const newShelf = await shelf.save()
        res.status(201).json(newShelf)
    } catch(err){
        res.status(400).json({message: err.message})
    }
};

exports.searchShelfByName = async (req, res) => {
    try {
        var param = functions.GetSearchParam(req.body.search);
        options.page = functions.GetPage(req.body.page);

        const shelfs = await Shelf.paginate({ name: { $regex: '.*' + param + '.*', '$options' : 'i' }, user: req.user }
                                                ,options)
        res.json(shelfs)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
};

exports.getShelf = async (req, res, next)=> {
    try{
        var shelf = await Shelf.findById(req.params.id)
                                .populate({
                                    path: 'books',
                                    select: 'title author',
                                    populate: {
                                        path: 'author',
                                        select: 'name'
                                    }
                                });
        if(shelf == null){
            return res.status(httpStatus.NOT_FOUND).json({message: 'Shelf not found'})
        }

        if(!shelf.user || shelf.user.equals(req.user._id) == false){
            return res.status(httpStatus.FORBIDDEN).json({message: 'Forbidden'})
        }

        res.shelf = shelf;
        next();
    }catch(err){
        res.status(500).json({message: err.message})
    }
};