const mongoose = require('mongoose');
const config = require('../src/config/config');

//tell mongoose to use es6 implementation of promises
mongoose.Promise = global.Promise;

before(async () => {
    await mongoose.connect(process.env.DATABASE_URL_TEST, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

beforeEach(async () => {
    await Promise.all(Object.values(mongoose.connection.collections).map(async (collection) => collection.deleteMany()));
});

after(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
});

//Utils
require('./utils/functions.test');

//Model tests
require('./models/genre/index');