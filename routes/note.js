var Model = require('./../models/note');

var addNote = function(req, res) {
    new Model.Note({
        text:   req.body.text,
        color:  req.body.color,
        date:   req.body.date
    }).save()
        .then(function(note) {
            res.json(note);
        }).catch(function(error) {
            console.log(error);
            res.send('Error sending to DB');
        })
};

var getNote = function(req, res) {
    var noteId = req.params.id;
    new Model.Note().where('id', noteId)
        .fetch()
        .then(function(note) {
            res.json(note);
        }).catch(function(error) {
            console.log(error);
            res.send('Error retrieving from DB');
        });
};

module.exports = {
    addNote: addNote,
    getNote: getNote
}
