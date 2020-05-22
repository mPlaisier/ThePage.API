const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const Genre = require('../../models/genre.js')
const functions = require("../../utils/functions.js");

//Fixed values
const pageLimit = process.env.GENRE_LIMIT;
const options = {
    select: 'name user',
    limit: pageLimit,
    sort: { name: 'asc'},
    collation: { locale: 'en' }
};

exports.getGenres = async (req, res) => {
    try{
        options.page = functions.GetPage(req.body.page);

        const genres = await Genre.paginate({user: req.user}, options);
        res.json(genres);
    } catch(err){
        res.status(500).json({message: err.message})
    }
};

exports.addGenre = async (req, res) => {
    const genre = new Genre({
        name: req.body.name,
        user: req.user
    })
    try{
        const newGenre = await genre.save()
        res.status(201).json(newGenre)
    } catch(err){
        res.status(400).json({message: err.message})
    }
};

exports.searchGenreByName = async (req, res) => {
    try {
        var param = functions.GetSearchParam(req.body.search);
        options.page = functions.GetPage(req.body.page);

        const genres = await Genre.paginate({ name: { $regex: '.*' + param + '.*', '$options' : 'i' }, user: req.user }
                                                ,options)
        res.json(genres)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
};

exports.getGenre = async (req, res, next)=> {
    try{
        var genre = await Genre.findById(req.params.id)
        if(!genre){
            throw new ApiError(httpStatus.NOT_FOUND, 'Genre not found');
        }

        if(!genre.user || genre.user.equals(req.user._id) == false){
            throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
        }

        res.genre = genre;
        next();
    }catch(err){
        res.status(500).json({message: err.message})
    }
};