const Shelf = require('../../models/shelf.js')
const functions = require("../../utils/functions.js");

//Fixed values
const pageLimit = process.env.SHELF_LIMIT;
const options = {
    limit: pageLimit,
    sort: { name: 'asc'},
    collation: { locale: 'en' }
};

exports.getShelfs = async (req, res) => {
    try{
        options.page = functions.GetPage(req.body.page);

        const shelfs = await Shelf.paginate({}, options);
        res.json(shelfs);
    } catch(err){
        res.status(500).json({message: err.message})
    }
};

exports.searchShelfByName = async (req, res) => {
    try {
        var param = functions.GetSearchParam(req.body.search);
        options.page = functions.GetPage(req.body.page);

        const shelfs = await Shelf.paginate({ name: { $regex: '.*' + param + '.*', '$options' : 'i' } }
                                                ,options)
        res.json(shelfs)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
};