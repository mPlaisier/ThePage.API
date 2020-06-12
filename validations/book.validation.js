const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const getBooks = {
    body: Joi.object().keys({
      page: Joi.number().integer()
    })
};

const addBook = {
    body: Joi.object().keys({
      title: Joi.string().required(),
      author: Joi.required().custom(objectId),
      genres: Joi.array().items(objectId),
      isbn: Joi.string(),
      owned: Joi.boolean(),
      read: Joi.boolean(),
      pages: Joi.number().integer(),
      olkey: Joi.string(),
      olcover: Joi.any(),
      ebook: Joi.boolean()
    })
};

const searchBookByTitle = {
    body: Joi.object().keys({
        search: Joi.string().required(),
        page: Joi.number().integer()
    })
};

const searchBookByIsbn = {
    body: Joi.object().keys({
        search: Joi.string().required(),
        page: Joi.number().integer()
    })
};

const getBookDetail = {
    params: Joi.object().keys({
        id: Joi.required().custom(objectId),
    })
};

const updateBook = {
    params: Joi.object().keys({
        id: Joi.required().custom(objectId),
    }),
    body: Joi.object().keys({
        title: Joi.string(),
        author: Joi.custom(objectId),
        genres: Joi.array().items(objectId),
        isbn: Joi.string(),
        owned: Joi.boolean(),
        read: Joi.boolean(),
        pages: Joi.number().integer(),
        olkey: Joi.string(),
        olcover: Joi.any(),
        ebook: Joi.boolean()
    })
};

const deleteBook = {
    params: Joi.object().keys({
        id: Joi.required().custom(objectId),
    })
};

module.exports = {
    getBooks,
    addBook,
    searchBookByTitle,
    searchBookByIsbn,
    getBookDetail,
    updateBook,
    deleteBook
};