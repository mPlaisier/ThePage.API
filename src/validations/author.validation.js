const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const getAuthors = {
    body: Joi.object().keys({
      page: Joi.number().integer()
    })
};

const addAuthor = {
    body: Joi.object().keys({
      name: Joi.string().required(),
      olkey: Joi.string()
    })
};

const searchAuthorByName = {
    body: Joi.object().keys({
        search: Joi.string().required(),
        page: Joi.number().integer()
    })
};

const getAuthorDetail = {
    params: Joi.object().keys({
        id: Joi.required().custom(objectId),
    })
};

//updateGenre
const updateAuthor = {
    params: Joi.object().keys({
        id: Joi.required().custom(objectId),
    }),
    body: Joi.object().keys({
        id: Joi.required().custom(objectId),
        name: Joi.string(),
        olkey: Joi.string()
    })
};

//deleteGenre
const deleteAuthor = {
    params: Joi.object().keys({
        id: Joi.required().custom(objectId),
    })
};

module.exports = {
    getAuthors,
    addAuthor,
    searchAuthorByName,
    getAuthorDetail,
    updateAuthor,
    deleteAuthor
};