exports.getAuthorDetail = (req, res)=> {
    res.send(res.author)
 };

exports.updateAuthor = async (req, res)=> {
    if(req.body.name != null){
        res.author.name = req.body.name;
    }

    if(req.body.olkey != null){
        res.author.olkey = req.body.olkey;
    }

    try{
        const updatedAuthor = await res.author.save()
        res.json(updatedAuthor)
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