var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/changeData', function (req, res) {
    res.render('changeData', {user: req.user});
});

router.post('/changeData', function (req, res) {
    // User.findByIdAndUpdate(req.user._id, {$set: {firstName: req.body.newFirstName}}, {new: true}).
    // then(result => res.render('home', {user: result}));

});

module.exports = router;
