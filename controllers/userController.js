let User = require('../models/user');
let _ = require('underscore');

let userController = {};

userController.list = function (req, res) {
    User.find({}).then(result => res.render('', {users: result}))
};

userController.show = function (req, res) {
    User.findById(req.user._id).then(res.render('', {user: result}));
};

userController.update = function (req, res) {
    let newFirstName,
        newLastName,
        newUsername;
    if (req.body.newFirstName) newFirstName = req.body.newFirstName;
    else newFirstName = req.user.firstName;
    if (req.body.newLastName) newLastName = req.body.newLastName;
    else newLastName = req.user.lastName;
    if (req.body.newUsername) {
        User.findOne({username: req.body.newUsername}, function (err, user) {
            if (err){
                console.log('Error in SignUp: '+err);
                return res.flash(err);
            }
            // already exists
            if (user) {
                console.log('User already exists with username: '+ req.body.newUsername);
                return  ;
            }
        });
        newUsername = req.body.newUsername
    } else
        newUsername = req.user.username;
    User.findByIdAndUpdate(req.user._id, {$set: {firstName: newFirstName, lastName: newLastName, username: newUsername}}, {new: true}).
        then(result => res.render('home', {user: result}));

};





module.exports = userController;