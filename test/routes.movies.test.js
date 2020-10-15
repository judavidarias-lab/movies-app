const assert = require('assert');
const proxyquire = require('proxyquire');
const chai = require("chai");
const expect = chai.expect;
const sinon = require('sinon');

const { moviesMock, MoviesServiceMock } = require('../utils/mocks/movies.js');
const testServer = require('../utils/testServer');

describe('routes - movies', function() {

  const route = proxyquire('../routes/movies', {
    '../services/movies': MoviesServiceMock
  });

  const request = testServer(route);

  describe('GET /movies', function() {
    it('should respond with status 200', function(done) {
      
      request.get('/api/movies').expect(200, done);
    });

    it('should respond with the list of movies', function() {
      request.get('/api/movies').end((err, res) => {
        expect({
          data: moviesMock,
          message: 'movies listed'
        }).to.eql(res.body);
      });
    });

  });


  describe('POST /movies', function() {
    it('should respond with status 201', function(done) {
      request.post('/api/movies', moviesMock[0]).expect(201, done);
    });

    it('should respond with the object of movies', function() {
      request.post('/api/movies', moviesMock[0]).end((err, res) => {

        expect({
          data: moviesMock[0].id,
          message: 'movie created'
        }).to.eql(res.body);
      });
    });
    
  });

  describe('PUT /api/movies/id', function() {
    it('should respond with status 200', function(done) {
      request.put('/api/movies/'+moviesMock[0].id, moviesMock[0]).expect(200, done);
    });

    it('should respond with the object updated', function() {
      request.put('/api/movies/'+moviesMock[0].id, moviesMock[0]).end((err, res) => {
        expect({
          data: moviesMock[0].id,
          message: 'movie updated'
        }).to.eql(res.body);
      });
    });
    
  });


  describe('GET /api/movies/id', function() {
    it('should respond with status 200', function(done) {
      request.get('/api/movies/'+moviesMock[0].id).expect(200, done);
    });

    it('should respond with the object updated', function() {
      request.get('/api/movies/'+moviesMock[0].id).end((err, res) => {
        expect({
          data: moviesMock[0].id,
          message: 'movie retrieved'
        }).to.eql(res.body);
      });
    });
    
  });


  describe('DELETE /movies', function() {
    it('should respond with status 200', function(done) {
      request.delete('/api/movies/'+moviesMock[0].id).expect(200, done);
    });

    it('should respond with the object deleted', function() {
      request.delete('/api/movies/'+moviesMock[0].id).end((err, res) => {
        expect({
          data: moviesMock[0].id,
          message: 'movie deleted'
        }).to.eql(res.body);
      });
    });
    
  });
  


});
