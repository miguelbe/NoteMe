var app = require('../app');
var bookshelf = app.get('bookshelf');
var Note = require('./note');

var User = bookshelf.Model.extend({
    tableName: 'Users',
    note: function() {
        return this.hasMany(Note);
    }
});

module.exports = User;
