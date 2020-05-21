const Genre = require('../../models/genre.js')
const functions = require("../../utils/functions.js");

//Fixed values
const pageLimit = process.env.GENRE_LIMIT;
const options = {
    select: 'name',
    limit: pageLimit,
    sort: { name: 'asc'},
    collation: { locale: 'en' }
};

exports.getGenres = async (req, res) => {
    try{
        options.page = functions.GetPage(req.body.page);

        const genres = await Genre.paginate({}, options);
        res.json(genres);
    } catch(err){
        res.status(500).json({message: err.message})
    }
};

exports.searchGenreByName = async (req, res) => {
    try {
        var param = functions.GetSearchParam(req.body.search);
        options.page = functions.GetPage(req.body.page);

        const genres = await Genre.paginate({ name: { $regex: '.*' + param + '.*', '$options' : 'i' } }
                                                ,options)
        res.json(genres)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
};