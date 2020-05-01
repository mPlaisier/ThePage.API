const mongoose = require('mongoose')

const shelfSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Book'
    }]
})

module.exports = mongoose.model('Shelf',shelfSchema)