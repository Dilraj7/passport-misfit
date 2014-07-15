/* global module */

var express = require('express'),
  passport = require('passport'),
  bodyParser = require('body-parser'),
  MisfitStrategy = require('../../lib/passport-misfit/index').Strategy;

var CLIENT_KEY = '-- client key --';
var CLIENT_SECRET = '-- client secret --';

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete misfit profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


// Use the MisfitStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and misfit
//   profile), and invoke a callback with a user object.
passport.use(new MisfitStrategy({
    clientID: CLIENT_KEY,
    clientSecret: CLIENT_SECRET,
    callbackURL: 'http://127.0.0.1:3000/auth/misfit/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      // To keep the example simple, the user's misfit profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the misfit account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  })
);



var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/login', function(req, res){
  res.render('login', { user: req.user });
});

// GET /auth/misfit
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in misfit authentication will involve redirecting
//   the user to misfit.com.  After authorization, misfit will redirect the user
//   back to this application at /auth/misfit/callback
app.get('/auth/misfit', passport.authenticate('misfit'), function() {

});



// GET /auth/misfit/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/misfit/callback',
  passport.authenticate('misfit', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

app.set('port', process.env.PORT || 3000);


module.exports = {
  start: function () {
    var server = app.listen(app.get('port'), function() {
      console.log('Express server listening on port ' + server.address().port);
    });
  },
  stop: function () {
    app.close();
  }
};