var Note = bookshelf.Model.extend({
    tableName: 'Notes',
    user: function() {
        return this.belongsTo(User);
    },
    defaults: {
        text:   '',
        color:  'pink',
        date:   function() {
            return new Date();
        }
    }
});

var Notes = bookshelft.Collection.extend({
    model: Note
});

module.exports = Notes;

