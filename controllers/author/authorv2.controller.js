const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const Author = require('../../models/author.model.js')
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

        const authors = await Author.paginate({user: req.user}, options)
        res.json(authors)
    } catch(err){
        res.status(500).json({message: err.message})
    }
}

exports.addAuthor = async (req, res) => {
    const author = new Author({
        name: req.body.name,
        olkey: req.body.olkey,
        user: req.user
    });

    try{
        const newauthor = await author.save()
        res.status(201).json(newauthor)
    } catch(err){
        res.status(400).json({message: err.message})
    }
};

exports.searchAuthorByName = async (req, res) => {
    try {
        var param = functions.GetSearchParam(req.body.search);
        options.page = functions.GetPage(req.body.page);

        const authors = await Author.paginate({ name: { $regex: '.*' + param + '.*', '$options' : 'i' }, user: req.user }
                                                ,options)
        res.json(authors)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
};

exports.getAuthor = async (req, res, next)=> {
    try{
        var author = await Author.findById(req.params.id)
        if(author == null){
            return res.status(httpStatus.NOT_FOUND).json({message: 'Cannot find author'})
        }

        if(!author.user || author.user.equals(req.user._id) == false){
            return res.status(httpStatus.FORBIDDEN).json({message: 'Forbidden'})
        }

        res.author = author;
        next();
    }catch(err){
        res.status(500).json({message: err.message})
    }
};