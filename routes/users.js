var Model = require('./../models/user');

var addUser = function(req, res) {
    new Model.User({
        username:   req.body.username,
        email:      req.body.email,
    }).save()
        .then(function(user) {
            res.json(user);
        }).catch(function(error) {
            console.log(error);
            res.send('Error saving to DB');
        });
};

var getUser = function(req, res) {
    var userId = req.params.id;
    new Model.User().where('id', userId)
        .fetch()
        .then(function (user) {
            res.json(user);
        }).catch(function (error) {
            console.log(error);
            res.send('An error occured');
        });
};

module.exports = {
    addUser: addUser,
    getUser: getUser
}
