const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const getGenres = {
    body: Joi.object().keys({
      page: Joi.number().integer()
    })
};

//addGenre
const addGenre = {
    body: Joi.object().keys({
      name: Joi.string().required()
    })
};

//searchGenreByName
const searchGenreByName = {
    body: Joi.object().keys({
        search: Joi.string().required(),
        page: Joi.number().integer()
    })
};

//getGenreDetail
const getGenreDetail = {
    params: Joi.object().keys({
        id: Joi.required().custom(objectId),
    })
};

//updateGenre
const updateGenre = {
    params: Joi.object().keys({
        id: Joi.required().custom(objectId)
    }),
    body: Joi.object().keys({
        id: Joi.required().custom(objectId),
        name: Joi.string().required()
    })
};

//deleteGenre
const deleteGenre = {
    params: Joi.object().keys({
        id: Joi.required().custom(objectId),
    })
};

module.exports = {
    getGenres,
    addGenre,
    searchGenreByName,
    getGenreDetail,
    updateGenre,
    deleteGenre
};