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
        ebook: Joi.boolean(),
        images: Joi.object().keys({
            smallThumbnail: Joi.string().uri(),
            thumbnail: Joi.string().uri(),
            small: Joi.string().uri(),
            medium: Joi.string().uri(),
            large: Joi.string().uri(),
            extraLarge: Joi.string().uri(),
        })
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

const searchBookFilter = {
    param: Joi.object().keys({
        search: Joi.string(),
        read: Joi.boolean(),
        page: Joi.number().integer()
    })
}

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
        id: Joi.custom(objectId),
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
    searchBookFilter,
    getBookDetail,
    updateBook,
    deleteBook
};