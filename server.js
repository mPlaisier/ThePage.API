if(process.env.MODE_ENV !== 'production' && process.env.MODE_ENV !== 'staging'){
    require('dotenv').config()
}
const express = require('express')
const app = express()

//Setup MongoDB
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

//Enable JSON
app.use(express.json())

require('./routes/genre.routes')(app);
require('./routes/author.routes')(app);
require('./routes/book.routes')(app);
require('./routes/shelf.routes')(app);

//Listen
app.listen(process.env.PORT || 3000)