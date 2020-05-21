const Author = require('../../models/author.js')
const functions = require("../../utils/functions.js");

//Fixed values
const pageLimit = process.env.AUTHOR_LIMIT;
const options = {
    select: 'name olkey',
    limit: pageLimit,
    sort: { name: 'asc'},
    collation: { locale: 'en' }
};

exports.getAuthors = async (req, res)=> {
    try{
        options.page = functions.GetPage(req.body.page);

        const authors = await Author.paginate({}, options)
        res.json(authors)
    } catch(err){
        res.status(500).json({message: err.message})
    }
}

exports.searchAuthorByName = async (req, res) => {
    try {
        var param = functions.GetSearchParam(req.body.search);
        options.page = functions.GetPage(req.body.page);

        const authors = await Author.paginate({ name: { $regex: '.*' + param + '.*', '$options' : 'i' } }
                                                ,options)
        res.json(authors)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
};