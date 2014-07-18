/**
 * Module dependencies.
 */
var util = require('util'),
  OAuth2Strategy = require('passport-oauth').OAuth2Strategy,
  InternalOAuthError = require('passport-oauth').InternalOAuthError;


/**
 * `Strategy` constructor.
 *
 * The Misfit authentication strategy authenticates requests by delegating to
 * Misfit using the OAuth 2.0 protocol.
 *
 * Applications must supply a `verify` callback which accepts an `accessToken`,
 * `refreshToken` and service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occurred, `err` should be set.
 *
 * Options:
 *   - `clientID`      your Misfit application's app key
 *   - `clientSecret`  your Misfit application's app secret
 *   - `callbackURL`   URL to which Misfit will redirect the user after granting authorization
 *
 * Examples:
 *
 *     passport.use(new MisfitStrategy({
 *         clientID: 'app key',
 *         clientSecret: 'app secret'
 *         callbackURL: 'https://www.example.net/auth/misfit/callback'
 *       },
 *       function(accessToken, refreshToken, profile, done) {
 *         User.findOrCreate(..., function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */

function Strategy(options, verify) {

  options = options || {};
  options.authorizationURL = options.authorizationURL ||
    'https://api.misfitwearables.com/auth/dialog/authorize';
  options.tokenURL = options.tokenURL || 'https://api.misfitwearables.com/auth/tokens/exchange';
  options.response_type = options.response_type || 'token';
  options.scopeSeparator = options.scopeSeparator || ',';
  options.scope = options.scope || ['public', 'birthday', 'email'];

  OAuth2Strategy.call(this, options, verify);
  this.name = 'misfit';
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(Strategy, OAuth2Strategy);


/**
 * Retrieve user profile from Misfit.
 *
 * This function constructs a normalized profile, with the following properties:
 *
 *   - `provider`         always set to `Misfit`
 *   - `id`               misfit userid
 *   - `username`         misfit name
 *   - `gender`           misfit gender
 *   - `email`            misfit email
 *   - `birthday`         misfit email
 *
 * @param {String} accessToken
 * @param {Function} done
 * @api protected
 */
Strategy.prototype.userProfile = function (accessToken, done) {
  var oauth2 = this._oauth2;
  oauth2.get('https://api.misfitwearables.com/move/resource/v1/user/me/profile',
    accessToken, function (err, result) {
    if (err) {
      return done(new InternalOAuthError('failed to fetch user profile', err));
    }

    result = JSON.parse(result);

    var profile = {
      provider: 'misfit'
    };
    profile.id = result.userId;
    profile.username = result.name;
    profile.gender = result.gender;
    profile.email = result.email;
    profile.birthday = result.birthday;

    done(null, profile);
  });
};


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
