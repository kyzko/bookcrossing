let Book = require('../models/book');
let User = require('../models/user');
let uuidv4 = require('uuid/v4');
let _ = require('underscore');

let bookController = {};

bookController.list = function (req, res) {
    Book.find({}).then(result => res.render('', {users: result}))
};

bookController.show = function (req, res) {
    Book.findById(req.user._id).then(res.render('', {user: result}));
};

bookController.add = function (req, res) {
    let newBook = new Book();
    newBook.title = req.body.newTitle;
    newBook.author = req.body.newAuthor;
    newBook.yearPublishing = req.body.newYear;
    newBook.UUID = uuidv4();
    newBook.status = 'register';

    newBook.save(function (err, savebook) {
        let regbookid = new User({
            bookRegistered: savebook.id
        });
        User.findByIdAndUpdate(req.user._id, {
                $push : {
                    bookRegistered: savebook._id
                }
        }, {
            new: true
        }).then(result => console.log(result));
    });

    bookController.userBook(req, res);

};

bookController.userBook = function(req, res) {
    Book.find({_id: {
        $in: req.user.bookRegistered
        }}).then(result => res.render('home', {user: req.user, bookRegistered: result, form: 'Выйти'}));
};

bookController.search = function(req, res) {
    Book.findOne({UUID: req.body.searchUUID}).then(result => res.render('search', {book: result}));
};

module.exports = bookController;