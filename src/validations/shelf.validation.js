const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const getShelfs = {
    body: Joi.object().keys({
      page: Joi.number().integer()
    })
};

const addShelf = {
    body: Joi.object().keys({
      name: Joi.string().required(),
      books: Joi.array().items(objectId)
    })
};

const searchShelfByName = {
    body: Joi.object().keys({
        search: Joi.string().required(),
        page: Joi.number().integer()
    })
};

const getShelfDetail = {
    params: Joi.object().keys({
        id: Joi.required().custom(objectId),
    })
};

const updateShelf = {
    params: Joi.object().keys({
        id: Joi.required().custom(objectId),
    }),
    body: Joi.object().keys({
        id: Joi.required().custom(objectId),
        name: Joi.string().required(),
        books: Joi.array().items(objectId)
    })
};

const deleteShelf = {
    params: Joi.object().keys({
        id: Joi.required().custom(objectId),
    })
};

module.exports = {
    getShelfs,
    addShelf,
    searchShelfByName,
    getShelfDetail,
    updateShelf,
    deleteShelf
};