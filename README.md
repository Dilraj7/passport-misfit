passport-misfit
===============

Misfit (OAuth2) authentication strategy for Passport and Node.js.



# Passport-Misfit

[Passport](http://passportjs.org/) strategy for authenticating with [Misfit](http://www.misfitwearables.com/)
using OAuth2.

This module lets you authenticate using Misfit in your Node.js applications.
By plugging into Passport, Misfit authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

    $ npm install passport-misfit

## Usage

#### Configure Strategy

The Msfit authentication strategy authenticates users using a Misfit account,
which is also an OAuth identifier.  The strategy requires a `validate`
callback, which accepts this identifier and calls `done` providing a user.

	passport.use(new MisfitStrategy({
		clientID: 'app key',
		clientSecret: 'app secret'
		callbackURL: 'https://www.example.net/auth/misfit/callback'
	},
		function(accessToken, refreshToken, profile, done) {
			User.findOrCreate(..., function (err, user) {
				done(err, user);
			});
		}
	));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'misfit'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/misfit',
      passport.authenticate('misfit'));

    app.get('/auth/misfit/callback', 
      passport.authenticate('misfit', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

## Examples

For a complete, working example, refer to the [signon example](https://github.com/pryv/passport-misfit/tree/master/examples/signon).

## Tests

    $ npm install --dev
    $ make test

## License

[Revised BSD license](https://github.com/pryv/documents/blob/master/license-bsd-revised.md)

