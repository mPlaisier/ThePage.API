const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  olkey:{
    type: String,
    required: false
  }
})

authorSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Author', authorSchema)