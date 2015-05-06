var DBConfig = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'NoteMe',
        charset: 'utf8'
    }
};

var knex = require('knex')(DBConfig);
//var bookshelf = require('bookshelf')(knex);

module.exports = knex;
