const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
})

genreSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Genre', genreSchema)