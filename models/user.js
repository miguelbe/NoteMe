var User = bookshelf.Model.extend({
    tableName: 'Users',
    notes: function() {
        return this.hasMany(Note);
    }
});

module.exports = function(app) {
    User: User
};


