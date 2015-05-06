var express = require('express');
var router = express.Router();
var app = require('../app');

/* GET home page. */

var index = function(req, res) {

    console.log(req.session.loggedIn);
    res.render('index', {
        title: 'NoteMe',
        loggedIn: req.session.loggedIn
    });
};


module.exports.index = index;
