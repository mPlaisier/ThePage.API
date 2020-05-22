const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
const { toJSON } = require('./plugins');

const shelfSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Book'
    }],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
})

shelfSchema.plugin(toJSON);
shelfSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Shelf',shelfSchema)