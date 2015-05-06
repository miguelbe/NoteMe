var express = require('express');
var express = require('../app');
var app = express();
console.log(express);
var bookshelf = app.get('bookshelf');
var User = bookshelf.Model.extend({
    tableName: 'Users',
    notes: function() {
        return this.hasMany(Note);
    }
});

modules.exports = User;

