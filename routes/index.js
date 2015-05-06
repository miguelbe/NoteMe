var express = require('express');
var router = express.Router();

/* GET home page. */

var index = function(req, res) {
    res.render('index', {
        title: 'NoteMe'
    });
};


module.exports.index = index;
