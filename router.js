var user = require('./routes/users');
var note = require('./routes/note');
var index = require('./routes/index');

module.exports = function(app) {
    app.get('/', index.index);

    app.post('/users', user.addUser);
    app.get('/user/:id', user.getUser);
}
