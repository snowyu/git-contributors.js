/* global describe, it, beforeEach, afterEach */
/* jshint expr:true, indent:2, maxlen:92 */

'use strict';

var fs     = require('fs'),
    sinon  = require('sinon'),
    chai   = require('chai'),
    git    = require('../lib/gitlog'),
    expect = chai.expect,

    GitContributors = require('../').GitContributors;


var readIn = function readIn (file) {
  return fs.readFileSync(file, 'utf-8');
};

var stubFixture = function stubFixture (file) {
  sinon.stub(git, 'log').returns(readIn(file));
};


describe('git-contributors', function () {

  describe('#list()', function () {

    beforeEach(function () {
    });

    afterEach(function () {
      git.log.restore();
    });


    it('can parse a single user commit', function (done) {

      var inFixture, outFixture;

      inFixture = 'test/fixtures/actual/single-user-single-commit.log';

      outFixture = 'test/fixtures/expected/single-user-single-commit.json';

      stubFixture(inFixture);

      GitContributors.list('.', function (err, result) {

        expect(err).to.not.exist;

        expect(result).to.deep.equal(JSON.parse(readIn(outFixture)));

        done();
      });

    }); //it


    it('can parse multiple commits from a single user', function (done) {

      var inFixture, outFixture;

      inFixture = 'test/fixtures/actual/single-user-multiple-commit.log';

      outFixture = 'test/fixtures/expected/single-user-multiple-commit.json';

      stubFixture(inFixture);

      GitContributors.list('.', function (err, result) {

        expect(err).to.not.exist;

        expect(result).to.deep.equal(JSON.parse(readIn(outFixture)));

        done();
      });

    }); //it


    it('can parse same user with different emails ', function (done) {

      var inFixture, outFixture;

      inFixture = 'test/fixtures/actual/single-user-multiple-commit-different-mail.log';

      outFixture = 'test/fixtures/expected/single-user-multiple-commit-different-mail.json';

      stubFixture(inFixture);

      GitContributors.list('.', function (err, result) {

        expect(err).to.not.exist;

        expect(result).to.deep.equal(JSON.parse(readIn(outFixture)));

        done();
      });

    }); //it


    it('can parse multiple user with same email', function (done) {

      var inFixture, outFixture;

      inFixture = 'test/fixtures/actual/multi-user-same-mail.log';

      outFixture = 'test/fixtures/expected/multi-user-same-mail.json';

      stubFixture(inFixture);

      GitContributors.list('.', function (err, result) {

        expect(err).to.not.exist;

        expect(result).to.deep.equal(JSON.parse(readIn(outFixture)));

        done();
      });
    }); //it
  });

  describe('when given wrong arguments', function () {

    it('should not throw when no path given via string', function (done) {

      var f = function () {
        GitContributors.list(null, function (/*err, result*/) {
          done();
        });
      };

      expect(f).to.not.throw();
    });
  });

  describe('support for --format option', function () {

    afterEach(function () {
      git.log.restore();
    });

    it('markdown', function (done) {

      var inFixture, outFixture;

      inFixture = 'test/fixtures/actual/single-user-multiple-commit.log';

      outFixture = 'test/fixtures/expected/single-user-multiple-commit.md';

      stubFixture(inFixture);

      GitContributors.list({cwd:'.', markdown: true}, function (err, result) {

        expect(err).to.not.exist;

        expect(result).to.deep.eql(readIn(outFixture));

        done();
      });
    });
  });

});
