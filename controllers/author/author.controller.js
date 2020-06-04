const Author = require('../../models/author.model.js')

exports.getAuthors = async (req, res)=> {
    try{
        const authors = await Author.find()
        res.json(authors)
    } catch(err){
        res.status(500).json({message: err.message})
    }
}

exports.getAuthorDetail = (req, res)=> {
    res.send(res.author)
 };

exports.addAuthor = async (req, res) => {
    const author = new Author({
        name: req.body.name,
        olkey: req.body.olkey
    });

    try{
        const newauthor = await author.save()
        res.status(201).json(newauthor)
    } catch(err){
        res.status(400).json({message: err.message})
    }
};

exports.updateAuthor = async (req, res)=> {
    if(req.body.name != null){
        res.author.name = req.body.name;
    }

    if(req.body.olkey != null){
        res.author.olkey = req.body.olkey;
    }

    try{
        const updateauthor = await res.author.save()
        res.json(updateauthor)
    }catch(err){ 
        res.status(400).json({message: err.message})
    }
}

exports.deleteAuthor = async (req, res)=> {
    try{
        await res.author.remove()
        res.json({message: 'Deleted author'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
};

exports.getAuthor = async (req, res, next)=> {
    try{
        var author = await Author.findById(req.params.id)
        if(author == null){
            return res.status(404).json({message: 'Cannot find author',code: '31'})
        }        
    }catch(err){
        res.status(500).json({message: err.message})
    }
    res.author = author;
    next();
};