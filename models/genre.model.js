const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
const { toJSON } = require('./plugins');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    private: true
  }
})

genreSchema.plugin(toJSON);
genreSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Genre', genreSchema)