if(process.env.MODE_ENV !== 'production' && process.env.MODE_ENV !== 'staging'){
    require('dotenv').config()
}
const express = require('express')
const app = express()


//Setup MongoDB
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true ,useUnifiedTopology: true} )
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', (error) => console.log("Connected to Database"))

//Enable JSON
app.use(express.json())

//ROUTES
const authorsRouter = require('./routes/authors')
app.use('/api/authors', authorsRouter)

const genresRouter = require('./routes/genres')
app.use('/api/genres', genresRouter)

const booksRouter = require('./routes/books')
app.use('/api/books', booksRouter)


app.listen(process.env.PORT || 3000)