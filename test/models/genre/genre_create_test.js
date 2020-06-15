//inside create_test.js
const assert = require('assert');
const Genre = require('../../../src/models/genre.model');
const User = require('../../../src/models/user.model');

describe('Creating genre documents', () => {
    it('creates a genre', (done) => {
        const user = new User({
            name: 'mocha',
            email: 'mocha@email.com',
            password: 'abc123456'
        });

        const genre = new Genre({
            name: 'mocha genre',
            user: user
        });

        genre.save() //takes some time and returns a promise
            .then(() => {
                assert(!genre.isNew); //if genre is saved to db it is not new
                done();
        });
    });
});