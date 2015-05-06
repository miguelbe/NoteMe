var User = require('./../models/user');

var addUser = function(req, res) {
    // First check to see if the username is taken
    var user =  new User().where('username', req.body.username)
    .fetch()
    .then(function(user) {
        if (!(user === null)) {
            res.json({error: 'Username already exists!'}).end();
        }

        // Validate and save it if not found
        else if (typeof req.body.username === 'undefined' ||
                 typeof req.body.email    === 'undefined' ||
                 typeof req.body.password === 'undefined') {
            res.json({error: 'All fields must be filled in!'});
        }

        else if (!req.body.username.match(/^[\w-]{1,20}$/)) {
            res.json({error: 'Invalid username'}).end();
        }

        else if (!req.body.email.match(/^[\w.]+@[\w.]+$/)) {
            res.json({error: 'Invalid email'}).end();
        }

        else if (!req.body.password.match(/^.{8,}$/)) {
            res.json({error: 'Password must be 8 or more characters'}).end();
        }

        // Looks valid enough, let's save it
        else {
            var user = new User({
                username:   req.body.username,
                email:      req.body.email,
                password:   req.body.password
            })
            .save()
            .then(function(user) {
                //res.redirect('/');
                res.send('Success!');
            }).catch(function(error) {
                console.log(error);
                res.send('Error saving to DB');
            });

            // And log in while we're here
            req.session.User = user;
        }
    });
}

var getUser = function(req, res) {
    new User().where('username', req.body.username)
        .fetch()
        .then(function (user) {
            return user;
        }).catch(function (error) {
            console.log(error);
            res.send('An error occured');
        });
};

var verifyUser = function(req, res) {
    if (typeof req.body.username === 'undefined' ||
       typeof req.body.password === 'undefined') {
        res.json({error: 'Wrong username or password'});
        console.log({error: 'Wrong username or password'});
    } else {
        console.log(req.body.username);
        var user = new User().where('username', req.body.username)
            .fetch()
            .then(function (user) {
                console.log(user);
                if (typeof user === undefined ||
                    req.body.password !== user.get('password')) {
                    res.json({error: 'Wrong username or password'});
                    console.log({error: 'Wrong username or password'});
                }
                else if (req.body.password === user.get('password')) {
                    console.log(user);
                    console.log(user.get('username'));
                    req.session.User = user;
                    console.log(user.username + " logged in");
                    //res.json({loggedIn: true});
                    res.redirect('/');
                }
            });
    }
}

module.exports = {
    addUser: addUser,
    getUser: getUser,
    verifyUser: verifyUser
}
