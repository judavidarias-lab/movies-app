const assert = require('assert');
const proxyquire = require('proxyquire');
const chai = require('chai');
const expeted = chai.expect;

const { MongoLibMock, getAllStub,createStub } = require('../utils/mocks/mongoLib');

const { moviesMock } = require('../utils/mocks/movies');

describe('services - movies', function() {
  const MoviesServices = proxyquire('../services/movies', {
    '../lib/mongo': MongoLibMock
  });

  const moviesService = new MoviesServices();

  describe('when getMovies method is called', async function() {
    it('should call the getall MongoLib method', async function() {
      await moviesService.getMovies({});
      expeted(getAllStub.called).eq(true);
    });

    it('should return an array of movies', async function() {
      const result = await moviesService.getMovies({});
      const expected = moviesMock;
      expeted(result).eql(expected);
    });
  });

  describe('when createMovie method  is call', function(){
  
    it('should return an movieid', async function() {
      const result = await moviesService.createMovie({});
      const expected = moviesMock[0].id;
      expeted(result).equals(expected);
    });


      it('should call the createMovie MongoLib method', async function() {
        await moviesService.createMovie({});
        expeted(createStub.called).eq(true);
      });

 

  });

});
