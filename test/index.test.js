/* global describe, it */

var should = require('should'),
  misfit = require('../lib/passport-misfit');

describe('index', function () {
  describe('version', function () {
    it('version sring must not be null', function (done) {
      should.exist(misfit.version);
      done();
    });
  });
});