const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
const { toJSON } = require('./plugins');
require('mongoose-type-url');

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
        required: false,
        default: false
    },
    read: {
        type: Boolean,
        required: false,
        default: false
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
        required: false,
        default: false
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      private: true
    },
    images: {
        smallThumbnail: {type: mongoose.SchemaTypes.Url, required: false},
        thumbnail: {type: mongoose.SchemaTypes.Url, required: false},
        small: {type: mongoose.SchemaTypes.Url, required: false},
        medium: {type: mongoose.SchemaTypes.Url, required: false},
        large: {type: mongoose.SchemaTypes.Url, required: false},
        extraLarge: {type: mongoose.SchemaTypes.Url, required: false},
    }
})

bookSchema.plugin(toJSON);
bookSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Book',bookSchema)