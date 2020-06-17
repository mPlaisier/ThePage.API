const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
const { toJSON } = require('./plugins');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  olkey:{
    type: String,
    required: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    private: true
  }
})

authorSchema.plugin(toJSON);
authorSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Author', authorSchema)