var mongoose = require('mongoose');
let Book = require('./book');

module.exports = mongoose.model('User',{
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: String,
    // gender: String,
    // address: String

    bookRegistered: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        }
    ],
    bookRead: [
        {
            book: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book'
            },
            rating: {
                type: Number,
                min: 1,
                max: 10
            }}
    ],
    bookFound: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        }]

});