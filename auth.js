var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy; 

passport.use(new LocalStrategy(
    function(username, password, done){

        //TODO: connect to the db to check uname and pass

        if(username === 'admin' && password === 'admin'){
            return done(null, {username: 'admin'});
        } //else 

        return done(null, false);
    }
));

passport.serializeUser(function(user, done){
    done(null, user.username);
});

passport.deserializeUser(function(username, done){
    done(null, {username: username});
});

module.exports = passport; 