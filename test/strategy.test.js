/* global describe, it, before, after */

var
  MisfitStrategy = require('../lib/passport-misfit'),
  nock = require('nock'),
  server = require('passport-server.js');

var CLIENT_KEY = '-- client key --';
var CLIENT_SECRET = '-- client secret --';


describe('MisfitStrategy', function () {

  before( function (done) {
    server.start();
    done();
  });

  after( function (done) {
    server.stop();
    done();
  });

  describe('authenticate', function () {
    it('should have a access_token and user profile', function (done) {
    });
  });
});