const assert = require('assert');
const Genre = require('../../../src/models/genre.model');
const User = require('../../../src/models/user.model');


describe('Reading genre details', (done) => {

    beforeEach((done) => {
        const user = new User({
            name: 'mocha',
            email: 'mocha@email.com',
            password: 'abc123456'
        });

        const newGenre = new Genre({
            name: 'mocha genre',
            user: user
        });

        newGenre.save()
            .then(() => done());
    });

    it('finds genre with the name of poke', (done) => {
        Genre.findOne({
                name: 'mocha genre'
            })
            .then((genre) => {
                assert(genre.name === 'mocha genre');
                done();
            });
    })
});