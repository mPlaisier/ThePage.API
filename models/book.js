const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    },
    genres: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Genre'
    }],
    isbn: {
        type: String,
        required: false
    },
    owned: {
        type: Boolean,
        required: false
    },
    read: {
        type: Boolean,
        required: false
    },
    pages: {
        type: Number,
        required: false
    }

})

module.exports = mongoose.model('Book',bookSchema)