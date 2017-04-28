/* globals it: true} */
/* globals describe: true} */
// --- Above are JSHint's Linter Settings for this particular file --- //

var expect = require('chai').expect;
// We call supertest request because it does the same functionality as request does
var request = require('supertest');
var app = require('../index');

// Our first test

describe('Test name: GET /', function() {
    // tests will be written inside this function
    // it clause is the assertion, which represents a test
    it('should return a 200 response', function(done) {
        request(app).get('/')
            .expect(200, done);
    });
});
