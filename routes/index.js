let express = require('express');
let router = express.Router();
let User = require('../models/user');
let Book = require('../models/book');
let userController = require('../controllers/userController');
let bookController = require('../controllers/bookController');

let isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
};

module.exports = function(passport){

    function authChecker(req, res, next) {
        if (req.user || req.path==='/' || req.path === '/signup' || req.path === '/login') {
            next();
        } else {
            res.redirect('/');
        }
    }

    router.use(authChecker);

    /* GET login page. */
    router.get('/', function(req, res) {
        // Display the Login page with any flash message, if any
        res.render('index', { message: req.flash('message') });
    });

    /* Handle Login POST */
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash : true
    }));

    /* GET Registration Page */
    router.get('/signup', function(req, res){
        res.render('register',{message: req.flash('message')});
    });

    /* Handle Registration POST */
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash : true
    }));

    /* GET Home Page */
    router.get('/home', isAuthenticated, function(req, res){
        bookController.userBook(req, res);
        // res.render('home', { user: req.user, form: 'Выход' });
    });

    /* Handle Logout */
    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    router.get('/main', function (req, res) {
        res.render('main', {user: req.user, form: 'Выход'});

    });

    router.get('/changeData', function (req, res) {
        res.render('changeData', {user: req.user, form: 'Вернуться в ЛК'});
    });

    router.post('/changeData', function (req, res) {
        userController.update(req, res);
    });


    router.get('/register', function (req, res) {
        res.render('register', {form: 'Вход'});
    });

    router.get('/registerBook', function (req, res) {
        res.render('registerBook', {user: req.user, form: 'Выйти'});
    });

    router.post('/registerBook', function (req, res) {
        bookController.add(req, res);
    });
    router.get('/search', function (req, res) {
        res.render('search', {user: req.user, form: 'Выйти'});
    });

    router.post('/api/search', function (req, res) {
        console.log(req.body.searchUUID);
        Book.find({UUID: req.body.searchUUID}).then(result => res.json(result));
    });

    router.post('/api/registerBook', function (req, res) {
        console.log('post');

        bookController.add(req, res);
        // console.log(`post = ${req.body.title}`);
        // let book = new Book();
        // book.title= req.body.title;
        // book.author = req.body.author;
        // book.yearPublishing = req.body.year;
        //
        // book.save().then(response => res.json(response));
    });

    router.get('/api/registerBook', function (req, res) {
        console.log(`UUID = ${req.body.UUID}`);
        Book.find({title: req.body.title}).then(result => res.json(result));
    });

    return router;
};
