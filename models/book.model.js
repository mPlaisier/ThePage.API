const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
const { toJSON } = require('./plugins');

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
    },
    olkey:{
      type: String,
      required: false
    },
    olcover: {
        type: mongoose.Schema.Types.Mixed,
        required: false,
    },
    ebook: {
        type: Boolean,
        required: false
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
})

bookSchema.plugin(toJSON);
bookSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Book',bookSchema)