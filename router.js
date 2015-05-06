var user = require('./routes/users');
var note = require('./routes/note');

module.exports = function(app) {
    app.get('/', function(req, res) {
        if (req.session.User) {
            res.render('index', {
                title: 'NoteMe',
                username: req.session.User.username,
                email: req.session.User.email,
            });
        }
        else {
            res.render('index');
        }
    });

    app.get('/signup', function(req, res) {
        res.render('signup')
    });

    app.post('/addUser', user.addUser);
    app.post('/verifyUser', user.verifyUser);
    app.get('/user/:id', user.getUser);

    app.post('/addNote', note.addNote);
    app.post('/getAllNotes', note.getAllNotes);
    app.post('/deleteNote', note.deleteNote);

    app.get('/logout', function(req, res) {
        req.session.destroy();
        res.redirect('/');
    });
}
