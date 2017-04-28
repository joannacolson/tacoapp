/* globals it: true} */
/* globals describe: true} */
/* globals before: true */
// --- Above are JSHint's Linter Settings for this particular file --- //

var expect = require('chai').expect;
var request = require('supertest');
var app = require('../index');
var db = require('../models');


// using a db / setup
// this cleans up and sets up the database for the testing
before(function(done) {
    db.sequelize.sync({ force: true })
        .then(function() {
            done();
        });
});

// GET /tacos
describe('GET /tacos', function() {
    it('should return status code 200', function(done) {
        request(app).get('/tacos')
            .expect(200, done);
    });
});

// POST /tacos
describe('POST /tacos', function() {
    it('should create and redirect to /tacos after posting a valid taco', function(done) {
        request(app).post('/tacos')
            .type('form')
            .send({
                name: 'Cheesy Gordita Crunch',
                amount: 6000
            })
            .expect('Location', '/tacos')
            .expect(302, done);
    });
    // this is a sample stub that Reno added to the sample
    it('should not create a taco and return with a 404', function(done) {
        done();
    });
});

// GET /tacos/new
// GET /tacos/:id/edit
// GET /tacos/:id

describe('GET /tacos/', function() {
    it('should return a 200 when accessing /tacos/new', function(done) {
        request(app).get('/tacos/new')
            .end(function(err, response) {
                expect(response.statusCode).to.equal(200);
                done();
            });
    });

    it('should load a taco on the edit page and return 200', function(done) {
        request(app).get('/tacos/1/edit')
            .end(function(err, response) {
                expect(response.statusCode).to.equal(200);
                done();
            });
    });

    it('should load a taco and return 200', function(done) {
        request(app).get('/tacos/1')
            .end(function(err, response) {
                expect(response.statusCode).to.equal(200);
                done();
            });
    });
});

// PUT /tacos/:id
describe('PUT /tacos/:id', function() {
    it('should change the name of a taco', function(done) {
        request(app).put('/tacos/1')
            .type('form')
            .send({
                name: 'Soft Taco',
                amount: 1
            })
            .end(function(err, response) {
                expect(response.statusCode).to.equal(200);
                expect(response.body).to.have.property('msg');
                expect(response.body.msg).to.equal('success');
                done();
            });
    });
});


// DELETE /tacos/:id
describe('DELETE /tacos/:id', function() {
    it('should return a 200 response on deleting a valid taco', function(done) {
        request(app).delete('/tacos/1')
            .end(function(err, response) {
                expect(response.statusCode).to.equal(200);
                expect(response.body).to.have.property('msg');
                expect(response.body.msg).to.equal('success');
                done();
            });
    });
    it('should not be able to delete a non-existent taco', function(done) {
        request(app).delete('/tacos/1')
            .end(function(err, response) {
                expect(response.statusCode).to.not.equal(200);
                expect(response.body).to.have.property('msg');
                expect(response.body.msg).to.equal('error');
                done();
            });
    });
});
