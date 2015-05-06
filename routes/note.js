var Note = require('./../models/note');
var User = require('./../models/user');

var addNote = function(req, res) {
    new User().where('username', req.session.User.username)
        .fetch()
        .then(function(user) {
            return user.note().create({
                text:   req.body.text,
                color:  req.body.color,
                date:   req.body.date
            });
        })
        .then(function(note) {
            //res.json(note);
            res.redirect('/');
        }).catch(function(error) {
            console.log(error);
            res.send('Error sending to DB');
        })
};

var getNote = function(req, res) {
    var noteId = req.params.id;
    new Note().where('id', noteId)
        .fetch()
        .then(function(note) {
            res.json(note);
        }).catch(function(error) {
            console.log(error);
            res.send('Error retrieving from DB');
        });
};
var deleteNote = function(req, res) {
    new User({id: req.session.User.id})
        .note()
        .query({where: {id: req.body.id}})
        .fetchOne()
        .then(function(note) {
            console.log(note);
            return note.destroy();
        })
        .then(function(note) {
            res.json({message: "Note destroyed"});
        })
};

var getAllNotes = function(req, res) {
    new User().where('username', req.session.User.username)
        .fetch()
        .then(function(user) {
            return user.note().fetch();
        })
        .then(function(note) {
            res.json(note);
            //res.redirect('/');
        }).catch(function(error) {
            console.log(error);
            res.send('Error sending to DB');
        })

};

module.exports = {
    addNote: addNote,
    getNote: getNote,
    getAllNotes: getAllNotes,
    deleteNote: deleteNote
}
