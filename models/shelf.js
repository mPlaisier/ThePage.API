const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

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

shelfSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Shelf',shelfSchema)